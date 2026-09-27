import { describe, expect, test } from "bun:test"
import {
  mayOpen,
  mayUse,
  NEVER_OPENED_ITEM_IDS,
} from "akasha/temper/addon/pages/items/modules/inventory-use-guard/inventory-use-guard.module.code.ts"
import { ruleAf179f2a } from "akasha/temper/player/progress/temper-inventory-rule/pages/rule-af179f2a/rule-af179f2a.temper-inventory-rule.ts"
import { ruleContainersOpen } from "akasha/temper/player/progress/temper-inventory-rule/pages/rule-containers-open/rule-containers-open.temper-inventory-rule.ts"
import { nothing } from "akasha/temper/player/progress/temper-item-action/pages/nothing.temper-item-action.ts"

const TROPHY = 5
const MOTIF = 8

describe("inventory-use-guard", () => {
  test("only a container is opened", () => {
    expect(mayOpen(18, 224724)).toBe(true)
    expect(mayOpen(70, 1)).toBe(true)
    expect(mayOpen(75, 1)).toBe(true)
    expect(mayOpen(TROPHY, 1)).toBe(false)
    expect(mayOpen(60, 1)).toBe(false)
  })

  test("an unknown writ, an unidentified survey report and an unopened treasure map are never opened", () => {
    for (const itemId of [217917, 217923, 219849, 219854, 224681]) {
      expect(mayOpen(75, itemId)).toBe(false)
    }
  })

  test("the rule before the open rule keeps every one of those containers unopened", async () => {
    expect(ruleAf179f2a.displayOrder).toBeLessThan(ruleContainersOpen.displayOrder)
    expect(ruleAf179f2a.action).toEndWith(`/${nothing.slug}`)
    expect(ruleAf179f2a.categoryId).toBe(ruleContainersOpen.categoryId)
    const line = await Bun.file(
      new URL(
        "../../../../../player/progress/temper-inventory-rule/pages/rule-af179f2a/rule-af179f2a.temper-inventory-rule.conditions.jsonl",
        import.meta.url
      )
    ).text()
    const ids: unknown = JSON.parse(JSON.parse(line.trim()).conditionValue)
    expect(ids).toEqual([...NEVER_OPENED_ITEM_IDS])
  })

  test("a treasure map, a survey report, a master writ and a holiday writ are never used", () => {
    expect(mayUse(TROPHY, 100)).toBe(false)
    expect(mayUse(TROPHY, 101)).toBe(false)
    expect(mayUse(60, 2750)).toBe(false)
    expect(mayUse(60, 2760)).toBe(false)
    expect(mayUse(60, 0)).toBe(false)
  })

  test("a motif and a recipe fragment are used", () => {
    expect(mayUse(MOTIF, 60)).toBe(true)
    expect(mayUse(TROPHY, 104)).toBe(true)
  })
})
