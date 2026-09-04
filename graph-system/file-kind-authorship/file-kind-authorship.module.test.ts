import { expect, test } from "bun:test"
import {
  AUTHORED_FILE_KINDS,
  AUTHORED_FILE_NODE_TYPES,
  authorshipOf,
  nodeTypeOf,
} from "./file-kind-authorship.module.code.ts"

test("a kind a hand writes is authored", () => {
  expect(authorshipOf("ts")).toBe("authored")
  expect(authorshipOf("md")).toBe("authored")
  expect(authorshipOf("systemd-unit")).toBe("authored")
})

test("a kind a tool emits is serialized", () => {
  expect(authorshipOf("lock")).toBe("serialized")
  expect(authorshipOf("json")).toBe("serialized")
  expect(authorshipOf("sops-secret")).toBe("serialized")
})

test("a kind no rule names as authored is serialized", () => {
  expect(authorshipOf("csv")).toBe("serialized")
})

test("a kind's node type is the kind's own name followed by `-file`", () => {
  expect(nodeTypeOf("ts")).toBe("ts-file")
  expect(nodeTypeOf("sops-config")).toBe("sops-config-file")
  expect(nodeTypeOf("yml")).toBe("yml-file")
})

test("every authored kind is authored and stands as its own node type", () => {
  for (const kind of AUTHORED_FILE_KINDS) {
    expect(authorshipOf(kind)).toBe("authored")
  }
  expect(AUTHORED_FILE_NODE_TYPES).toEqual(AUTHORED_FILE_KINDS.map(nodeTypeOf))
})

test("the twelve kinds a hand writes are the authored ones", () => {
  expect([...AUTHORED_FILE_KINDS].sort()).toEqual([
    "css",
    "dockerfile",
    "js",
    "jsx",
    "lua",
    "md",
    "rust",
    "sh",
    "swift",
    "systemd-unit",
    "ts",
    "tsx",
  ])
})
