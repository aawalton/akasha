import { describe, expect, test } from "bun:test"
import { isRecord } from "../../../utils-narrow/src/is-record"
import {
  migrateViewData,
  parseViewDataJSON,
  type ViewConfig,
  type ViewDataJSON,
  type VisibilityChange,
  viewConfigToData,
  viewDataToConfig,
} from "./view-data"

function migratedRecord(raw: unknown): Record<string, unknown> {
  const migrated = migrateViewData(raw)
  if (!isRecord(migrated)) {
    throw new Error(`expected migrateViewData to return a record, got ${typeof migrated}`)
  }
  return migrated
}

describe("migrateViewData fills page-size defaults", () => {
  test("empty object gets page_size, group_page_size, item_page_size defaults", () => {
    const migrated = migratedRecord({})
    expect(migrated.page_size).toBe(12)
    expect(migrated.group_page_size).toBe(6)
    expect(migrated.item_page_size).toBe(12)
  })

  test("explicit page_size is preserved; missing siblings filled with defaults", () => {
    const migrated = migratedRecord({ page_size: 50 })
    expect(migrated.page_size).toBe(50)
    expect(migrated.group_page_size).toBe(6)
    expect(migrated.item_page_size).toBe(12)
  })

  test("explicit group_page_size is preserved; missing siblings filled", () => {
    const migrated = migratedRecord({ group_page_size: 4 })
    expect(migrated.page_size).toBe(12)
    expect(migrated.group_page_size).toBe(4)
    expect(migrated.item_page_size).toBe(12)
  })

  test("explicit item_page_size is preserved; missing siblings filled", () => {
    const migrated = migratedRecord({ item_page_size: 25 })
    expect(migrated.page_size).toBe(12)
    expect(migrated.group_page_size).toBe(6)
    expect(migrated.item_page_size).toBe(25)
  })

  test("all three explicit values pass through unchanged", () => {
    const migrated = migratedRecord({
      page_size: 30,
      group_page_size: 5,
      item_page_size: 20,
    })
    expect(migrated.page_size).toBe(30)
    expect(migrated.group_page_size).toBe(5)
    expect(migrated.item_page_size).toBe(20)
  })
})

describe("parseViewDataJSON round-trips page-size fields", () => {
  test("all three fields survive parseViewDataJSON without being dropped", () => {
    const input = JSON.stringify({
      version: 1,
      page_size: 25,
      group_page_size: 7,
      item_page_size: 9,
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.page_size).toBe(25)
      expect(result.data.group_page_size).toBe(7)
      expect(result.data.item_page_size).toBe(9)
    }
  })

  test("native object input round-trips page-size fields", () => {
    const result = parseViewDataJSON({
      version: 1,
      page_size: 100,
      group_page_size: 3,
      item_page_size: 50,
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.page_size).toBe(100)
      expect(result.data.group_page_size).toBe(3)
      expect(result.data.item_page_size).toBe(50)
    }
  })
})

describe("viewDataToConfig maps page-size fields to camelCase", () => {
  test("page_size, group_page_size, item_page_size → pageSize, groupPageSize, itemPageSize", () => {
    const data: ViewDataJSON = {
      version: 1,
      page_size: 25,
      group_page_size: 7,
      item_page_size: 9,
    }
    const config = viewDataToConfig(data)
    expect(config.pageSize).toBe(25)
    expect(config.groupPageSize).toBe(7)
    expect(config.itemPageSize).toBe(9)
  })

  test("missing page-size fields yield undefined on the config", () => {
    const config = viewDataToConfig({ version: 1 })
    expect(config.pageSize).toBeUndefined()
    expect(config.groupPageSize).toBeUndefined()
    expect(config.itemPageSize).toBeUndefined()
  })
})

describe("parseViewDataJSON round-trips always_show_properties", () => {
  test("a non-empty always_show_properties array survives the parser", () => {
    const input = JSON.stringify({
      version: 1,
      visible_properties: ["name", "status", "priority"],
      always_show_properties: ["status", "priority"],
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.always_show_properties).toEqual(["status", "priority"])
    }
  })

  test("a view JSON with NO always_show_properties parses with the field undefined (back-compat)", () => {
    const input = JSON.stringify({
      version: 1,
      visible_properties: ["name", "status"],
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.always_show_properties).toBeUndefined()
    }
  })

  test("an empty always_show_properties array round-trips as an empty array", () => {
    const input = JSON.stringify({
      version: 1,
      visible_properties: ["name"],
      always_show_properties: [],
    })
    const result = parseViewDataJSON(input)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.always_show_properties).toEqual([])
    }
  })

  test("native object input round-trips always_show_properties", () => {
    const result = parseViewDataJSON({
      version: 1,
      visible_properties: ["a", "b"],
      always_show_properties: ["a"],
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.always_show_properties).toEqual(["a"])
    }
  })

  test("non-string entries in always_show_properties fail validation", () => {
    const result = parseViewDataJSON(
      JSON.stringify({ version: 1, always_show_properties: ["ok", 42] })
    )
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.type).toBe("validation_failed")
    }
  })
})

describe("VisibilityChange carries alwaysShowProperties", () => {
  test("a VisibilityChange value with all three lists type-checks and reads back", () => {
    const change: VisibilityChange = {
      visibleProperties: ["a", "b"],
      alwaysShowProperties: ["a"],
      hiddenPropertiesOrder: ["c"],
    }
    expect(change.alwaysShowProperties).toEqual(["a"])
    expect(change.visibleProperties).toEqual(["a", "b"])
    expect(change.hiddenPropertiesOrder).toEqual(["c"])
  })
})

describe("viewConfigToData maps camelCase back to snake_case", () => {
  test("pageSize, groupPageSize, itemPageSize → page_size, group_page_size, item_page_size", () => {
    const config: ViewConfig = {
      pageSize: 25,
      groupPageSize: 7,
      itemPageSize: 9,
    }
    const data = viewConfigToData(config)
    expect(data.page_size).toBe(25)
    expect(data.group_page_size).toBe(7)
    expect(data.item_page_size).toBe(9)
  })

  test("missing page-size fields yield undefined on the data", () => {
    const data = viewConfigToData({})
    expect(data.page_size).toBeUndefined()
    expect(data.group_page_size).toBeUndefined()
    expect(data.item_page_size).toBeUndefined()
  })

  test("page-size fields round-trip through viewConfigToData → viewDataToConfig", () => {
    const config: ViewConfig = {
      pageSize: 30,
      groupPageSize: 5,
      itemPageSize: 20,
    }
    const data = viewConfigToData(config)
    const back = viewDataToConfig({ version: 1, ...data })
    expect(back.pageSize).toBe(30)
    expect(back.groupPageSize).toBe(5)
    expect(back.itemPageSize).toBe(20)
  })
})
