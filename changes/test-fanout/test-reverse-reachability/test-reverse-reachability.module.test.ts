import { expect, test } from "bun:test"
import {
  computeTestReachability,
  type ReachabilityGraph,
  type ReachabilityHelpers,
} from "./test-reverse-reachability.module.code.ts"

const NODE_TYPES = ["ts-file"]

function graphOf(ids: readonly string[]): ReachabilityGraph {
  return { nodes: () => ids.map((id) => ({ id })) }
}

function helpersOver(edges: Readonly<Record<string, readonly string[]>>): ReachabilityHelpers {
  return {
    tsFileNodeTypes: NODE_TYPES,
    importEdgeTypes: ["import-static"],
    tsFileNodeId: (relPath) => `ts-file:code:${relPath}`,
    tsFileNodeIdToCodeRepoRel: (nodeId) =>
      nodeId.startsWith("ts-file:code:") ? nodeId.slice("ts-file:code:".length) : null,
    transitiveClosure: (_graph, from) => edges[from] ?? [from],
  }
}

const isTestFile = (relPath: string): boolean => relPath.endsWith(".unit.test.ts")

test("a file that is no test file yields no reachability", () => {
  const found = computeTestReachability(
    graphOf(["ts-file:code:src/a.ts"]),
    isTestFile,
    helpersOver({})
  )
  expect(found).toEqual([])
})

test("a test file names every file its closure reaches", () => {
  const found = computeTestReachability(
    graphOf(["ts-file:code:src/a.unit.test.ts"]),
    isTestFile,
    helpersOver({
      "ts-file:code:src/a.unit.test.ts": [
        "ts-file:code:src/a.unit.test.ts",
        "ts-file:code:src/a.ts",
        "ts-file:code:src/b.ts",
      ],
    })
  )
  expect(found).toEqual([
    {
      testFile: "src/a.unit.test.ts",
      reachedFiles: ["src/a.unit.test.ts", "src/a.ts", "src/b.ts"],
    },
  ])
})

test("a node standing for no file of the code repo is passed over", () => {
  const found = computeTestReachability(
    graphOf(["package:code:tools/lib", "ts-file:code:src/a.unit.test.ts"]),
    isTestFile,
    helpersOver({ "ts-file:code:src/a.unit.test.ts": ["ts-file:code:src/a.unit.test.ts"] })
  )
  expect(found.map((one) => one.testFile)).toEqual(["src/a.unit.test.ts"])
})

test("a reached node standing for no file of the code repo is left out of the reach", () => {
  const found = computeTestReachability(
    graphOf(["ts-file:code:src/a.unit.test.ts"]),
    isTestFile,
    helpersOver({
      "ts-file:code:src/a.unit.test.ts": [
        "ts-file:code:src/a.unit.test.ts",
        "package:code:tools/lib",
      ],
    })
  )
  expect(found[0]?.reachedFiles).toEqual(["src/a.unit.test.ts"])
})
