export type RestoreMetricId = "health-restore" | "magicka-restore" | "stamina-restore"

const RESTORE_RESOURCES: readonly { readonly metricId: RestoreMetricId; readonly word: string }[] =
  [
    { metricId: "health-restore", word: "Health" },
    { metricId: "magicka-restore", word: "Magicka" },
    { metricId: "stamina-restore", word: "Stamina" },
  ]

function stripColorCodes(text: string): string {
  return text.replaceAll(/\|c[0-9a-fA-F]{6}/g, "").replaceAll(/\|r/g, "")
}

export function parseRestoreMetricIdsFromAbilityText(
  abilityDescription: string
): readonly RestoreMetricId[] {
  const cleaned = stripColorCodes(abilityDescription)
  const spans: string[] = []
  for (const span of cleaned.matchAll(/Restore\b(.*?)\bimmediately/gis)) {
    spans.push(span[0])
  }
  const haystack = spans.join("\n")
  return RESTORE_RESOURCES.filter(({ word }) =>
    new RegExp(`\\b${word}\\b`, "i").test(haystack)
  ).map(({ metricId }) => metricId)
}
