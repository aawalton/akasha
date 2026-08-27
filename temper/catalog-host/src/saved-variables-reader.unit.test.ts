import { describe, expect, test } from "bun:test"
import { readAccountSummaries } from "./saved-variables-reader"

const WITH_SKIPS = `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["completed"] = false,
                ["apiVersion"] = "8.3.5",
                ["manifestApiVersion"] = 101044,
                ["lastSeenInvalidateVersion"] = 3,
                ["collectionSkips"] =
                {
                    ["skillCatalog"] = "attempt to compare number with nil",
                    ["poiCatalog"] = "collector did not complete within 60000ms",
                },
                ["achievementCatalog"] = true,
                ["classCatalog"] = true,
            },
        },
    },
}
`

const WITHOUT_SKIPS = `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["completed"] = true,
                ["apiVersion"] = "8.3.5",
                ["manifestApiVersion"] = 101044,
                ["lastSeenInvalidateVersion"] = 3,
                ["achievementCatalog"] = true,
                ["classCatalog"] = true,
            },
        },
    },
}
`

describe("readAccountSummaries — collectionSkips (#16074)", () => {
  test("surfaces skip reasons and excludes collectionSkips from presentDomainKeys, alongside real present domains", () => {
    const [summary] = readAccountSummaries(WITH_SKIPS)
    if (!summary) throw new Error("expected one account summary")

    expect(summary.collectionSkips).toEqual({
      skillCatalog: "attempt to compare number with nil",
      poiCatalog: "collector did not complete within 60000ms",
    })

    expect(summary.presentDomainKeys).not.toContain("collectionSkips")

    expect(summary.presentDomainKeys).toContain("achievementCatalog")
    expect(summary.presentDomainKeys).toContain("classCatalog")
  })

  test("defaults collectionSkips to {} (not undefined) when the file has no skip record", () => {
    const [summary] = readAccountSummaries(WITHOUT_SKIPS)
    if (!summary) throw new Error("expected one account summary")

    expect(summary.collectionSkips).toEqual({})

    expect(summary.presentDomainKeys).toContain("achievementCatalog")
    expect(summary.presentDomainKeys).toContain("classCatalog")
  })
})
