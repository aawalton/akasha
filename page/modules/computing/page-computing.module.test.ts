import { describe, expect, test } from "bun:test"
import {
  type Computed,
  computingOver,
  type Held,
  type Reaches,
  type Source,
  type Subject,
  type Working,
} from "akasha/page/modules/computing/page-computing.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

function held(slug: string, holds: string, work: Computed["work"]): Computed {
  return { slug, key: exportedAs(slug), holds, work }
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
      day: page("1", {}, [held("sound", "number", () => 4), held("wrong", "number", () => "four")]),
    })
    const working = computingOver(source).workedAt("day")
    expect(working?.value["sound"]).toBe(4)
    expect("wrong" in (working?.value ?? {})).toBe(false)
    expect(working?.dark.get("wrong")).toContain("answered string")
  })

  test("a calculation holding records answers a list of records", () => {
    const source = sourceOf({
      day: page("1", {}, [
        held("entries", "records", () => [{ line: "one" }, { line: "two" }]),
        held("loose", "records", () => [{ line: "one" }, "two"]),
      ]),
    })
    const working = computingOver(source).workedAt("day")
    expect(working?.value["entries"]).toEqual([{ line: "one" }, { line: "two" }])
    expect(working?.dark.get("loose")).toBe(
      "`loose` states it holds records, and its calculation answered a list"
    )
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

  test("a number that is not finite is absent on the page handed to a calculation", () => {
    for (const odd of [Infinity, -Infinity, NaN]) {
      const source = sourceOf({
        day: page("1", { points: odd, sound: 4 }, [
          held("counted", "number", (one) => ((one["points"] as number | undefined) ?? 0) + 1),
          held("carried", "boolean", (one) => "points" in one),
          held("beside", "number", (one) => one["sound"] as number),
        ]),
      })
      const working = computingOver(source).workedAt("day")
      expect(working?.value["counted"]).toBe(1)
      expect(working?.value["carried"]).toBe(false)
      expect(working?.value["beside"]).toBe(4)
    }
  })

  test("a number that is not finite is absent to a reach as well", () => {
    const source = sourceOf({
      one: page("1", { points: Infinity }, []),
      two: page("2", {}, [
        held("borrowed", "number", (_own, reach) => {
          const other = reach.target<Held>("one")
          return other === null ? null : ((other["points"] as number | undefined) ?? 7)
        }),
      ]),
    })
    const working = computingOver(source).workedAt("two")
    expect(working?.value["borrowed"]).toBe(7)
  })

  test("a number that is not finite remains in what a page carries", () => {
    const source = sourceOf({ day: page("1", { points: Infinity }, []) })
    const working = computingOver(source).workedAt("day")
    expect(working?.value["points"]).toBe(Infinity)
  })

  test("a calculation answering a number that is not finite is refused", () => {
    const source = sourceOf({ day: page("1", {}, [held("total", "number", () => Infinity)]) })
    const working = computingOver(source).workedAt("day")
    expect("total" in (working?.value ?? {})).toBe(false)
    expect(working?.dark.get("total")).toBe(
      "`total` states it holds number, and its calculation answered a number that is not finite"
    )
  })

  test("a page no slug names is answered as nothing", () => {
    expect(computingOver(sourceOf({})).workedAt("gone")).toBe(null)
  })
})

describe("a file a reach names", () => {
  const bytes = new TextEncoder().encode("one\ntwo\n")

  const lengthOf = held("tail", "text", (_own, reach) => {
    const filed = reach.file("/notes.txt")
    if (filed === null) return "none"
    return new TextDecoder().decode(filed.read(4, filed.size))
  })

  test("a calculation reads a run of a file's bytes through its reach", () => {
    const source: Source = {
      ...sourceOf({ day: page("1", {}, [lengthOf]) }),
      fileAt: (path) =>
        path === "/notes.txt"
          ? { size: bytes.length, read: (from, upTo) => bytes.slice(from, upTo) }
          : null,
    }
    expect(computingOver(source).workedAt("day")?.value["tail"]).toBe("two\n")
  })

  test("a source stating no way to read a file answers nothing", () => {
    const source = sourceOf({ day: page("1", {}, [lengthOf]) })
    expect(computingOver(source).workedAt("day")?.value["tail"]).toBe("none")
  })
})

const TINT: Reaches = { slug: "tint", kinds: new Set(["tint", "deep-tint"]) }

function reaching(slug: string, work: Computed["work"]): Computed {
  return { ...held(slug, "relation", work), reaches: TINT }
}

function namedBy(answer: string): Working | null {
  const source = sourceOf({
    "tint/moss": page("t", {}, []),
    "deep-tint/fern": page("d", {}, []),
    "shade/dusk": page("s", {}, []),
    seat: page("1", {}, [reaching("worked-tint", () => answer)]),
  })
  return computingOver(source).workedAt("seat")
}

describe("a calculation holding a relation", () => {
  test("a relation naming a page of the type reached is held as that page's address", () => {
    const working = namedBy("tint/moss")
    expect(working?.value["workedTint"]).toBe("tint/moss")
    expect(working?.dark.size).toBe(0)
  })

  test("a relation naming a page of a type extending the type reached is held", () => {
    expect(namedBy("deep-tint/fern")?.value["workedTint"]).toBe("deep-tint/fern")
  })

  test("a relation naming a page of another type is refused", () => {
    const working = namedBy("shade/dusk")
    expect("workedTint" in (working?.value ?? {})).toBe(false)
    expect(working?.dark.get("workedTint")).toContain("which is no page of that type")
  })

  test("a relation naming no page is refused", () => {
    expect(namedBy("tint/gone")?.dark.get("workedTint")).toContain("which names no page")
  })

  test("a relation that is no page's address is refused", () => {
    expect(namedBy("moss")?.dark.get("workedTint")).toContain("which is no page's address")
  })

  test("a relation that is no text is refused", () => {
    const source = sourceOf({ seat: page("1", {}, [reaching("worked-tint", () => 4)]) })
    const working = computingOver(source).workedAt("seat")
    expect(working?.dark.get("workedTint")).toBe(
      "`worked-tint` states it holds relation, and its calculation answered number"
    )
  })

  test("a property holding a relation and naming no page type to reach is refused", () => {
    const source = sourceOf({ seat: page("1", {}, [held("worked-tint", "relation", () => "a/b")]) })
    const working = computingOver(source).workedAt("seat")
    expect(working?.dark.get("workedTint")).toContain("names no page type that relation reaches")
  })

  test("a property naming a page type to reach and holding another kind is refused", () => {
    const text: Computed = { ...held("worked-tint", "text", () => "tint/moss"), reaches: TINT }
    const working = computingOver(sourceOf({ seat: page("1", {}, [text]) })).workedAt("seat")
    expect(working?.dark.get("workedTint")).toContain("states it holds text rather than a relation")
  })
})
