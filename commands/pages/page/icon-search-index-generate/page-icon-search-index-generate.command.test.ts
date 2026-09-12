import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  pageIconSearchIndexGenerate,
  type Stageable,
  type Staging,
  stagedSaid,
  wroteStage,
} from "akasha/commands/pages/page/icon-search-index-generate/page-icon-search-index-generate.command.code.ts"

const CALLED_AS = "akasha page icon-search-index-generate"

function given(): Given {
  return { root: "/nowhere", calledAs: CALLED_AS, from: "/nowhere", writer: null, agentId: null }
}

function shardOf(slug: string): Stageable {
  return {
    slug,
    files: [
      { at: `held/${slug}/${slug}.module.code.ts`, body: "code" },
      { at: `held/${slug}/${slug}.module.ts`, body: "page" },
    ],
  }
}

function keeping(): { readonly staging: Staging; readonly wrote: readonly string[] } {
  const wrote: string[] = []
  return {
    wrote,
    staging: {
      making: () => undefined,
      writing: (at) => {
        wrote.push(at)
      },
    },
  }
}

test("a flag it does not take is refused", async () => {
  const said = await pageIconSearchIndexGenerate(["--depth"], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    `\`--depth\` is no argument \`${CALLED_AS}\` takes — it takes \`--code-root\`, \`--stage\``
  )
})

test("a flag with no path after it is refused", async () => {
  const said = await pageIconSearchIndexGenerate(["--stage"], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("`--stage` takes a value, and none follows it")
})

test("every shard the stage took is named once that shard is whole", () => {
  const done: string[] = []
  const held = keeping()
  wroteStage("/stage", [shardOf("shard-00"), shardOf("shard-01")], done, held.staging)
  expect(done).toEqual([stagedSaid("shard-00"), stagedSaid("shard-01")])
  expect(held.wrote.length).toBe(4)
})

test("a write that throws part way leaves every shard before it named", () => {
  const done: string[] = []
  const staging: Staging = {
    making: () => undefined,
    writing: (at) => {
      if (at.includes("shard-01")) throw new Error("no space left on device")
    },
  }
  expect(() =>
    wroteStage("/stage", [shardOf("shard-00"), shardOf("shard-01")], done, staging)
  ).toThrow("no space")
  expect(done).toEqual([stagedSaid("shard-00")])
})

test("a throw before the first body is written names nothing at all", () => {
  const done: string[] = []
  const staging: Staging = {
    making: () => {
      throw new Error("permission denied")
    },
    writing: () => undefined,
  }
  expect(() => wroteStage("/stage", [shardOf("shard-00")], done, staging)).toThrow(
    "permission denied"
  )
  expect(done).toEqual([])
})

test("a shard only half written is named nowhere", () => {
  const done: string[] = []
  const staging: Staging = {
    making: () => undefined,
    writing: (at) => {
      if (at.endsWith(".module.ts")) throw new Error("no space left on device")
    },
  }
  expect(() => wroteStage("/stage", [shardOf("shard-00")], done, staging)).toThrow("no space")
  expect(done).toEqual([])
})

test("each body reaches the stage under the path it lands at", () => {
  const done: string[] = []
  const held = keeping()
  wroteStage("/stage", [shardOf("shard-00")], done, held.staging)
  expect(held.wrote[0]).toBe("/stage/held/shard-00/shard-00.module.code.ts")
})
