import { describe, expect, test } from "bun:test"
import {
  type Computed,
  computingOver,
  type Held,
  type Source,
  type Subject,
} from "./page-computing.module.code.ts"

function held(slug: string, holds: string, work: Computed["work"]): Computed {
  return { slug, key: slug.replace(/-(.)/g, (_, one: string) => one.toUpperCase()), holds, work }
}

function sourceOf(pages: Readonly<Record<string, Subject>>): Source {
  return { subjectAt: (slug) => pages[slug] ?? null }
}

function page(id: string, value: Held, computed: readonly Computed[]): Subject {
  return { id, value, computed }
}

describe("the values a page type's calculations work out", () => {
  test("a calculation fills its key", () => {
    const source = sourceOf({
      day: page("1", { strengthVolume: 700 }, [
        held("strength-calories", "number", (one) => (one["strengthVolume"] as number) / 7),
      ]),
    })
    const working = computingOver(source).workedAt("day")
    expect(working?.value["strengthCalories"]).toBe(100)
    expect(working?.dark.size).toBe(0)
  })

  test("a calculation answering absent puts no key on the page", () => {
    const source = sourceOf({ day: page("1", {}, [held("total", "number", () => null)]) })
    const working = computingOver(source).workedAt("day")
    expect("total" in (working?.value ?? {})).toBe(false)
    expect(working?.dark.size).toBe(0)
  })

  test("a computed key is worked out once over one page", () => {
    let asked = 0
    const source = sourceOf({
      day: page("1", {}, [
        held("once", "number", () => {
          asked += 1
          return 1
        }),
        held("reads", "number", (one) => (one["once"] as number) + (one["once"] as number)),
      ]),
    })
    const working = computingOver(source).workedAt("day")
    expect(working?.value["reads"]).toBe(2)
    expect(asked).toBe(1)
  })

  test("a wrong kind darkens that key and leaves its siblings whole", () => {
    const source = sourceOf({
      day: page("1", {}, [
        held("sound", "number", () => 4),
        held("wrong", "number", () => "four" as unknown as number),
      ]),
    })
    const working = computingOver(source).workedAt("day")
    expect(working?.value["sound"]).toBe(4)
    expect("wrong" in (working?.value ?? {})).toBe(false)
    expect(working?.dark.get("wrong")).toContain("answered string")
  })

  test("a property stating a kind no calculation answers is refused", () => {
    const source = sourceOf({ day: page("1", {}, [held("odd", "rainbow", () => 1)]) })
    const working = computingOver(source).workedAt("day")
    expect(working?.dark.get("odd")).toContain("`rainbow`")
  })

  test("a chain of reads coming back to where that chain started is refused", () => {
    const source = sourceOf({
      day: page("1", {}, [
        held("here", "number", (one) => one["there"] as number),
        held("there", "number", (one) => one["here"] as number),
      ]),
    })
    const working = computingOver(source).workedAt("day")
    expect(working?.dark.get("here")).toContain("comes back to where that chain started")
    expect(working?.dark.get("here")).toContain("1#here")
  })

  test("a calculation reading a refused calculation is refused too", () => {
    const source = sourceOf({
      day: page("1", {}, [
        held("broken", "number", () => {
          throw new Error("the calculation fell over")
        }),
        held("after", "number", (one) => one["broken"] as number),
      ]),
    })
    const working = computingOver(source).workedAt("day")
    expect(working?.dark.get("broken")).toBe("the calculation fell over")
    expect(working?.dark.get("after")).toBe("the calculation fell over")
  })

  test("a reach answers another page, worked as lazily as the page handed in", () => {
    const source = sourceOf({
      one: page("1", { points: 3 }, [
        held("twice", "number", (own) => (own["points"] as number) * 2),
      ]),
      two: page("2", {}, [
        held("borrowed", "number", (_own, reach) => {
          const other = reach.target<Held>("one")
          return other === null ? null : (other["twice"] as number)
        }),
      ]),
    })
    const working = computingOver(source).workedAt("two")
    expect(working?.value["borrowed"]).toBe(6)
  })

  test("a reach reaching no page answers nothing rather than refusing", () => {
    const source = sourceOf({
      two: page("2", {}, [
        held("borrowed", "number", (_own, reach) => (reach.target<Held>("gone") === null ? 0 : 1)),
      ]),
    })
    const working = computingOver(source).workedAt("two")
    expect(working?.value["borrowed"]).toBe(0)
    expect(working?.dark.size).toBe(0)
  })

  test("a chain of reads running between two pages is refused", () => {
    const source = sourceOf({
      one: page("1", {}, [
        held("here", "number", (_own, reach) => {
          const other = reach.target<Held>("two")
          return other === null ? null : (other["there"] as number)
        }),
      ]),
      two: page("2", {}, [
        held("there", "number", (_own, reach) => {
          const other = reach.target<Held>("one")
          return other === null ? null : (other["here"] as number)
        }),
      ]),
    })
    const working = computingOver(source).workedAt("one")
    expect(working?.dark.get("here")).toContain("comes back to where that chain started")
  })

  test("a page no slug names is answered as nothing", () => {
    expect(computingOver(sourceOf({})).workedAt("gone")).toBe(null)
  })
})
