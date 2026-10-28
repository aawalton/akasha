import { expect, test } from "bun:test"
import type { Target } from "akasha/page/service/modules/follow-planning/follow-planning.module.code.ts"
import { keptHearingFor } from "akasha/page/service/modules/kept-hearing/kept-hearing.module.code.ts"

const STORY: Target = { kind: "story-played", slugs: null, computed: "held/total.ts" }

test("a kept file heard reaches the follows aimed at it, by name or by its folder whole", () => {
  const reached: string[] = []
  const kept = keptHearingFor((one, path) => {
    reached.push(`${one.kind} ${path}`)
    return undefined
  })
  const heard = new Map([
    ["/r/a", new Set<string | null>(["one.ts"])],
    ["/r/b", new Set<string | null>([null])],
  ])
  kept.again(new Map([["held/total.kept.ts", heard]]), new Map([["held/total.kept.ts", [STORY]]]))
  kept.heard("/r/a", "one.ts")
  kept.heard("/r/a", "two.ts")
  kept.heard("/r/b", "any.ts")
  kept.heard("/r/c", "one.ts")
  expect(reached).toEqual(["story-played /r/a/one.ts", "story-played /r/b/any.ts"])
  expect([...kept.folders()].sort()).toEqual(["/r/a", "/r/b"])
})

test("a kept file that keeps other folders lets go the folders it no longer keeps", () => {
  const kept = keptHearingFor(() => undefined)
  const aimed = new Map([["k", [STORY]]])
  kept.again(new Map([["k", new Map([["/r/a", new Set<string | null>([null])]])]]), aimed)
  kept.again(new Map([["k", new Map([["/r/b", new Set<string | null>([null])]])]]), aimed)
  expect(kept.holds("/r/a")).toBe(false)
  expect(kept.holds("/r/b")).toBe(true)
  kept.again(new Map(), new Map())
  expect([...kept.folders()]).toEqual([])
})
