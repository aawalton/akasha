import { describe, expect, test } from "bun:test"
import {
  pathsFor,
  personaDocumentGateLines,
  personaDocumentStandsShell,
  personDocumentStandsShell,
  SLUG_MARK,
  shapeOf,
  shapesStanding,
  standsShell,
} from "./document-standing.module.code.ts"

describe("a shape", () => {
  test("is one standing page's path with its slug blanked out", () => {
    expect(shapeOf("akasha/persona-system/personas/akasha/akasha.persona.ts", "akasha")).toBe(
      `akasha/persona-system/personas/${SLUG_MARK}/${SLUG_MARK}.persona.ts`
    )
  })

  test("blanks only the last two parts, so a folder named for the slug higher up stays", () => {
    expect(shapeOf("akasha/akasha/personas/x/x.persona.ts", "akasha")).toBe(
      "akasha/akasha/personas/x/x.persona.ts"
    )
  })

  test("blanks a file whose name opens with the slug", () => {
    expect(shapeOf("akasha/person-system/people/pages/alan.person.ts", "alan")).toBe(
      `akasha/person-system/people/pages/${SLUG_MARK}.person.ts`
    )
  })
})

describe("the shapes standing", () => {
  test("hold every shape the pages take, sorted and said once each", () => {
    expect(
      shapesStanding(
        () => [
          { slug: "b", path: "one/b/b.persona.ts" },
          { slug: "a", path: "one/a/a.persona.ts" },
          { slug: "c", path: "two/c.persona.ts" },
        ],
        "fallback"
      )
    ).toEqual([`one/${SLUG_MARK}/${SLUG_MARK}.persona.ts`, `two/${SLUG_MARK}.persona.ts`])
  })

  test("fall back where the reading answers nothing", () => {
    expect(shapesStanding(() => [], "fallback")).toEqual(["fallback"])
  })

  test("fall back where the reading throws", () => {
    expect(
      shapesStanding(() => {
        throw new Error("no index")
      }, "fallback")
    ).toEqual(["fallback"])
  })
})

describe("what is asked in shell", () => {
  test("expands the slug as a shell word rather than spelling a slug", () => {
    expect(pathsFor([`p/${SLUG_MARK}/${SLUG_MARK}.persona.ts`], "name")).toEqual([
      "$_root/p/$name/$name.persona.ts",
    ])
  })

  test("asks every shape, so a tree half moved still answers", () => {
    expect(standsShell(["a", "b"])).toBe('[ -f "a" ] || [ -f "b" ]')
  })

  test("asks a persona document and a person document by the same rule", () => {
    for (const said of [personaDocumentStandsShell("name"), personDocumentStandsShell("name")]) {
      expect(said).toContain('[ -f "$_root/')
      expect(said).toContain("$name")
    }
  })
})

describe("the persona gate", () => {
  const said = personaDocumentGateLines("sn", "name").join("\n")

  test("refuses only where no shape stands", () => {
    expect(said).toContain('[ ! -f "$_root/')
    expect(said).not.toContain(" || ")
  })

  test("says a project-bound seat has none by design", () => {
    expect(said).toContain("A project-bound seat has none by design")
  })

  test("says a persona whose document has not moved in has none yet", () => {
    expect(said).toContain("has not migrated to the clean tree has none yet")
  })

  test("names how to resume an existing session instead", () => {
    expect(said).toContain("To resume an existing session: sr $name")
  })

  test("refuses", () => {
    expect(said).toContain("    return 1")
  })
})
