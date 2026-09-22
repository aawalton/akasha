import { ADDON_NAME } from "akasha/temper/addon/pages/catalog/modules/catalog-constants/catalog-constants.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

export interface ApiTest {
  name: string
  apiName: string
  testFn: (this: void) => string | undefined
}

const API_TESTS: ApiTest[] = [
  {
    name: "Achievements",
    apiName: "GetNumAchievementCategories",
    testFn: function (this: void): string | undefined {
      const count = GetNumAchievementCategories()
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Recipes",
    apiName: "GetNumRecipeLists",
    testFn: function (this: void): string | undefined {
      const count = GetNumRecipeLists()
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Lore Library",
    apiName: "GetNumLoreCategories",
    testFn: function (this: void): string | undefined {
      const count = GetNumLoreCategories()
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Antiquity Lore",
    apiName: "GetNextAntiquityId",
    testFn: function (this: void): string | undefined {
      const id = GetNextAntiquityId(undefined)
      if (id === undefined || id === 0) return "returned nil or 0"
      return undefined
    },
  },
  {
    name: "Cadwell",
    apiName: "GetNumZonesForCadwellProgressionLevel",
    testFn: function (this: void): string | undefined {
      const count = GetNumZonesForCadwellProgressionLevel(CADWELL_PROGRESSION_LEVEL_BRONZE)
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Item Sets",
    apiName: "GetNextItemSetCollectionId",
    testFn: function (this: void): string | undefined {
      const id = GetNextItemSetCollectionId(undefined)
      if (id === undefined || id === 0) return "returned nil or 0"
      return undefined
    },
  },
  {
    name: "Scribing",
    apiName: "GetNumCraftedAbilities",
    testFn: function (this: void): string | undefined {
      const count = GetNumCraftedAbilities()
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Trait Research",
    apiName: "GetNumSmithingResearchLines",
    testFn: function (this: void): string | undefined {
      const count = GetNumSmithingResearchLines(CRAFTING_TYPE_BLACKSMITHING)
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Collectibles",
    apiName: "GetNumCollectibleCategories",
    testFn: function (this: void): string | undefined {
      const count = GetNumCollectibleCategories()
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Tribute",
    apiName: "GetNumTributePatrons",
    testFn: function (this: void): string | undefined {
      const count = GetNumTributePatrons()
      if (count === 0) return "returned 0"
      return undefined
    },
  },
  {
    name: "Zone Completion",
    apiName: "GetNumZoneActivitiesForZoneCompletionType",
    testFn: function (this: void): string | undefined {
      const zoneId = GetNextZoneStoryZoneId(undefined)
      if (zoneId === undefined || zoneId === 0) return "GetNextZoneStoryZoneId returned nil or 0"
      const count = GetNumZoneActivitiesForZoneCompletionType(zoneId, ZONE_COMPLETION_TYPE_DELVES)
      if (count === undefined || count === 0) return "first zone has no delve activities"
      return undefined
    },
  },
  {
    name: "Points of Interest",
    apiName: "GetNumPOIs",
    testFn: function (this: void): string | undefined {
      const zoneId = GetNextZoneStoryZoneId(undefined)
      if (zoneId === undefined || zoneId === 0) return "GetNextZoneStoryZoneId returned nil or 0"
      const zoneIndex = GetZoneIndex(zoneId)
      const count = GetNumPOIs(zoneIndex)
      if (count === 0) return "first zone has 0 POIs"
      return undefined
    },
  },
]

function testApis(): undefined {
  const total = API_TESTS.length
  const failures: string[] = []

  for (const test of API_TESTS) {
    const [ok, result] = pcall(function (this: void): string | undefined {
      return test.testFn()
    })

    if (!ok) {
      failures.push(`  ERROR ${test.name}: ${test.apiName}: "${result}"`)
    } else if (result !== undefined) {
      failures.push(`  FAIL ${test.name}: ${test.apiName} ${result}`)
    }
  }

  if (failures.length === 0) {
    d(`[${ADDON_NAME}] All ${total} API groups OK`)
  } else {
    const passed = total - failures.length
    d(`[${ADDON_NAME}] API Test: ${passed}/${total} OK`)
    for (const line of failures) {
      d(line)
    }
  }
}

export function registerApiTestCommand(): undefined {
  SLASH_COMMANDS["/tempercatalogtest"] = function (this: void): undefined {
    testApis()
  }
  globalThis.Temper?.registerCommand({
    name: "/tempercatalogtest",
    description: "Catalog API test harness",
    addon: "TemperCatalog",
  })
}
