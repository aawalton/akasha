import { describe, expect, test } from "bun:test"
import type {
  CharacterCompletion,
  TraitResearchCraftType,
} from "@akasha/temper-completion/completion-progress"
import {
  isTraitResearchCardComplete,
  isTraitResearchItemComplete,
  transformTraitResearchProgress,
} from "./completion-trait-research-progress.module.code.ts"
import {
  AXE,
  BLACKSMITHING,
  CATALOG_CRAFT_TYPES,
  CATALOG_RESEARCH_LINES,
  capturedTraitResearch,
  characterRow,
  linesUnderCraft,
  POWERED,
  ROSTER_ONLY,
  TOTAL_CATALOG_TRAITS,
} from "./completion-trait-research-progress.module.test-fixtures.ts"

const CRAFTS = CATALOG_CRAFT_TYPES
const LINES = CATALOG_RESEARCH_LINES

function progressOf(completion: CharacterCompletion | null) {
  const [progress] = transformTraitResearchProgress([characterRow("c1", completion)], CRAFTS, LINES)
  if (progress === undefined) throw new Error("expected the character to be emitted")
  return progress
}

function cardComplete(completion: CharacterCompletion | null): boolean {
  return isTraitResearchCardComplete(completion, CRAFTS, LINES)
}

function itemComplete(
  completion: CharacterCompletion | null,
  itemPath: readonly (string | number)[]
): boolean {
  return isTraitResearchItemComplete(completion, itemPath, CRAFTS, LINES)
}

describe("transformTraitResearchProgress — the denominator is the catalog handed in", () => {
  test("the catalog under test is 4 craft types, 6 research lines and 54 traits", () => {
    expect(CRAFTS.length).toBe(4)
    expect(LINES.length).toBe(6)
    expect(TOTAL_CATALOG_TRAITS).toBe(54)
  })

  test("a character carrying only the first craft type still scores against the whole catalog", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({
        craftTypeIds: [BLACKSMITHING.esoCraftTypeId],
        known: (_craft, lineIndex) => lineIndex === AXE.displayOrder,
      }),
    }
    const progress = progressOf(completion)

    expect(progress.totalCount).toBe(TOTAL_CATALOG_TRAITS)
    expect(progress.knownCount).toBe(AXE.traits.length)
    expect(progress.craftTypes.map((craft) => craft.craftingType)).toEqual(
      CRAFTS.map((craft) => craft.esoCraftTypeId)
    )
    expect(cardComplete(completion)).toBe(false)
  })

  test("every emitted craft type and line carries its whole catalog subtotal", () => {
    const progress = progressOf({
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ craftTypeIds: [BLACKSMITHING.esoCraftTypeId] }),
    })

    for (const catalogCraft of CRAFTS) {
      const craft = progress.craftTypes.find((c) => c.craftingType === catalogCraft.esoCraftTypeId)
      if (craft === undefined)
        throw new Error(`craft type ${catalogCraft.esoCraftTypeId} is absent`)
      const catalogLines = linesUnderCraft(catalogCraft.slug)
      expect(craft.name).toBe(catalogCraft.title)
      expect(craft.totalCount).toBe(catalogLines.reduce((sum, l) => sum + l.traits.length, 0))
      expect(craft.lines.map((line) => line.researchLineIndex)).toEqual(
        catalogLines.map((line) => line.displayOrder)
      )
      for (const catalogLine of catalogLines) {
        const line = craft.lines.find((l) => l.researchLineIndex === catalogLine.displayOrder)
        if (line === undefined) throw new Error(`line ${catalogLine.displayOrder} is absent`)
        expect(line.name).toBe(catalogLine.title)
        expect(line.totalCount).toBe(catalogLine.traits.length)
        expect(line.traits.map((trait) => trait.traitIndex)).toEqual(
          catalogLine.traits.map((trait) => trait.traitIndex)
        )
      }
    }
  })

  test("a read character with no traitResearch key is emitted at nothing out of the whole", () => {
    const completion: CharacterCompletion = { ...ROSTER_ONLY, quests: [] }
    const progress = progressOf(completion)

    expect(progress.knownCount).toBe(0)
    expect(progress.totalCount).toBe(TOTAL_CATALOG_TRAITS)
    expect(cardComplete(completion)).toBe(false)
  })

  test("a character carrying only roster fields is not emitted at all", () => {
    expect(
      transformTraitResearchProgress([characterRow("c1", ROSTER_ONLY)], CRAFTS, LINES)
    ).toEqual([])
  })

  test("a null or absent completion is not emitted", () => {
    expect(transformTraitResearchProgress([characterRow("c1", null)], CRAFTS, LINES)).toEqual([])
    expect(transformTraitResearchProgress([characterRow("c1", {})], CRAFTS, LINES)).toEqual([])
  })

  test("a character knowing every trait is the whole catalog over itself, and complete", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ known: () => true }),
    }
    const progress = progressOf(completion)

    expect(progress.knownCount).toBe(TOTAL_CATALOG_TRAITS)
    expect(progress.totalCount).toBe(TOTAL_CATALOG_TRAITS)
    expect(cardComplete(completion)).toBe(true)
  })

  test("a trait is matched to what the game reported without regard to letter case", () => {
    const reported = capturedTraitResearch({
      craftTypeIds: [BLACKSMITHING.esoCraftTypeId],
      known: () => true,
    })
    const craft = reported[BLACKSMITHING.esoCraftTypeId]
    if (craft === undefined) throw new Error("the craft type is absent from what was reported")
    const line = craft.lines[AXE.displayOrder]
    if (line === undefined) throw new Error("the line is absent from what was reported")
    for (const [index, trait] of Object.entries(line.traits)) {
      line.traits[Number(index)] = { ...trait, name: trait.name.toUpperCase() }
    }

    const progress = progressOf({ ...ROSTER_ONLY, traitResearch: reported })
    const outCraft = progress.craftTypes.find(
      (c) => c.craftingType === BLACKSMITHING.esoCraftTypeId
    )
    const outLine = outCraft?.lines.find((l) => l.researchLineIndex === AXE.displayOrder)
    if (outLine === undefined) throw new Error("expected the line to be emitted")
    expect(outLine.knownCount).toBe(AXE.traits.length)
    expect(outLine.traits.map((trait) => trait.name)).toEqual(
      AXE.traits.map((trait) => trait.traitName)
    )
  })
})

describe("transformTraitResearchProgress — the order the catalog is read in", () => {
  test("craft types come back by the game number however the catalog is ordered", () => {
    const [progress] = transformTraitResearchProgress(
      [characterRow("c1", { ...ROSTER_ONLY, quests: [] })],
      [...CRAFTS].reverse(),
      LINES
    )
    if (progress === undefined) throw new Error("expected the character to be emitted")

    expect(progress.craftTypes.map((craft) => craft.craftingType)).toEqual([1, 2, 6, 7])
  })

  test("research lines come back by display order however the catalog is ordered", () => {
    const [progress] = transformTraitResearchProgress(
      [characterRow("c1", { ...ROSTER_ONLY, quests: [] })],
      CRAFTS,
      [...LINES].reverse()
    )
    if (progress === undefined) throw new Error("expected the character to be emitted")
    const jewelry = progress.craftTypes.find((craft) => craft.craftingType === 7)

    expect(jewelry?.lines.map((line) => line.researchLineIndex)).toEqual([1, 2])
    expect(jewelry?.lines.map((line) => line.name)).toEqual(["Ring", "Necklace"])
  })

  test("a research line hangs beneath the craft type its parent names", () => {
    const progress = progressOf({ ...ROSTER_ONLY, quests: [] })

    expect(
      progress.craftTypes.map((craft) => [craft.craftingType, craft.lines.map((l) => l.name)])
    ).toEqual([
      [1, ["Axe", "Mace"]],
      [2, ["Robe & Jerkin"]],
      [6, ["Bow"]],
      [7, ["Ring", "Necklace"]],
    ])
  })
})

describe("isTraitResearchCardComplete — nothing is complete for want of asking", () => {
  test("a null or empty completion is not complete", () => {
    expect(cardComplete(null)).toBe(false)
    expect(cardComplete({})).toBe(false)
  })

  test("an empty traitResearch map is not complete", () => {
    expect(cardComplete({ ...ROSTER_ONLY, traitResearch: {} })).toBe(false)
  })

  test("a craft type reported with no lines at all is not complete", () => {
    const traitResearch: Record<number, TraitResearchCraftType> = {}
    for (const craft of CRAFTS) {
      traitResearch[craft.esoCraftTypeId] = { name: craft.title, lines: {} }
    }
    expect(cardComplete({ ...ROSTER_ONLY, traitResearch })).toBe(false)
  })

  test("a line reported with no traits at all is not complete", () => {
    const traitResearch = capturedTraitResearch({ known: () => true })
    const craft = traitResearch[BLACKSMITHING.esoCraftTypeId]
    if (craft === undefined) throw new Error("the craft type is absent from what was reported")
    craft.lines[AXE.displayOrder] = { name: AXE.title, traits: {} }
    expect(cardComplete({ ...ROSTER_ONLY, traitResearch })).toBe(false)
  })

  test("every trait known but one craft type never reported is not complete", () => {
    const traitResearch = capturedTraitResearch({
      craftTypeIds: CRAFTS.slice(1).map((craft) => craft.esoCraftTypeId),
      known: () => true,
    })
    expect(cardComplete({ ...ROSTER_ONLY, traitResearch })).toBe(false)
  })

  test("an empty catalog leaves nothing to be complete against", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ known: () => true }),
    }
    expect(isTraitResearchCardComplete(completion, [], [])).toBe(false)
    expect(isTraitResearchCardComplete(completion, CRAFTS, [])).toBe(false)
  })
})

describe("isTraitResearchItemComplete — nothing is complete for want of asking", () => {
  test("an empty path names no item", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ known: () => true }),
    }
    expect(itemComplete(completion, [])).toBe(false)
  })

  test("a craft type reported with no lines is not complete at the craft type", () => {
    const traitResearch: Record<number, TraitResearchCraftType> = {
      [BLACKSMITHING.esoCraftTypeId]: { name: BLACKSMITHING.title, lines: {} },
    }
    expect(itemComplete({ ...ROSTER_ONLY, traitResearch }, [BLACKSMITHING.esoCraftTypeId])).toBe(
      false
    )
  })

  test("a line reported with no traits is not complete at the line", () => {
    const traitResearch: Record<number, TraitResearchCraftType> = {
      [BLACKSMITHING.esoCraftTypeId]: {
        name: BLACKSMITHING.title,
        lines: { [AXE.displayOrder]: { name: AXE.title, traits: {} } },
      },
    }
    expect(
      itemComplete({ ...ROSTER_ONLY, traitResearch }, [
        BLACKSMITHING.esoCraftTypeId,
        AXE.displayOrder,
      ])
    ).toBe(false)
  })

  test("a craft type, line or trait never reported is not complete at any level", () => {
    const completion: CharacterCompletion = { ...ROSTER_ONLY, traitResearch: {} }
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId])).toBe(false)
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, AXE.displayOrder])).toBe(false)
    expect(
      itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, AXE.displayOrder, POWERED.traitIndex])
    ).toBe(false)
  })

  test("every trait known is complete at the craft type, at the line and at the trait", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ known: () => true }),
    }
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId])).toBe(true)
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, AXE.displayOrder])).toBe(true)
    expect(
      itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, AXE.displayOrder, POWERED.traitIndex])
    ).toBe(true)
  })

  test("one unknown trait undoes its line and its craft type", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({
        known: (craftTypeId, lineIndex, traitIndex) =>
          !(
            craftTypeId === BLACKSMITHING.esoCraftTypeId &&
            lineIndex === AXE.displayOrder &&
            traitIndex === POWERED.traitIndex
          ),
      }),
    }
    expect(
      itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, AXE.displayOrder, POWERED.traitIndex])
    ).toBe(false)
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, AXE.displayOrder])).toBe(false)
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId])).toBe(false)
    expect(cardComplete(completion)).toBe(false)
  })

  test("a craft type, line or trait the catalog does not hold is not complete", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ known: () => true }),
    }
    expect(itemComplete(completion, [999])).toBe(false)
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, 999])).toBe(false)
    expect(itemComplete(completion, [BLACKSMITHING.esoCraftTypeId, AXE.displayOrder, 999])).toBe(
      false
    )
  })
})

describe("the trait research predicate agrees with the progress shown", () => {
  test("the card is complete exactly when the transform shows the whole catalog known", () => {
    const cases: readonly CharacterCompletion[] = [
      { ...ROSTER_ONLY, quests: [] },
      { ...ROSTER_ONLY, traitResearch: {} },
      {
        ...ROSTER_ONLY,
        traitResearch: capturedTraitResearch({ craftTypeIds: [BLACKSMITHING.esoCraftTypeId] }),
      },
      {
        ...ROSTER_ONLY,
        traitResearch: capturedTraitResearch({
          craftTypeIds: [BLACKSMITHING.esoCraftTypeId],
          known: () => true,
        }),
      },
      { ...ROSTER_ONLY, traitResearch: capturedTraitResearch({ known: () => true }) },
    ]

    for (const completion of cases) {
      const progress = progressOf(completion)
      expect(cardComplete(completion)).toBe(progress.knownCount === progress.totalCount)
    }
  })
})
