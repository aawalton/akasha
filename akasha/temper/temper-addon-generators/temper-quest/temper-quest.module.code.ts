import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const QUEST_SCHEMA = z
  .object({
    id: z.string(),
    esoQuestId: z.number(),
    questName: z.string(),
  })
  .strict()

const ZONE_SCHEMA = z
  .object({
    title: z.string(),
    zoneQuests: z.array(QUEST_SCHEMA).min(1),
  })
  .strict()

interface OutQuest {
  questId: number
  name: string
}

interface OutZone {
  zoneName: string
  quests: readonly OutQuest[]
}

function zoneOf(row: Page): OutZone {
  const held = ZONE_SCHEMA.parse({ title: row.title, zoneQuests: row.zoneQuests })
  const quests = [...held.zoneQuests].sort((a, b) => a.questName.localeCompare(b.questName))
  return {
    zoneName: held.title,
    quests: quests.map((quest) => ({ questId: quest.esoQuestId, name: quest.questName })),
  }
}

function versionOf(catalogDomains: readonly Page[]): string {
  const found = catalogDomains.find((row) => row.slug === "quest")
  if (found === undefined) throw new Error("no `temper-catalog-domain` page is slugged `quest`")
  const version = found.generatorRanForVersion
  if (typeof version !== "string") {
    throw new Error("the `quest` catalog domain states no `generator-ran-for-version`")
  }
  return version
}

function questLine(quest: OutQuest): string {
  return `    { questId: ${quest.questId}, name: ${JSON.stringify(quest.name)} }`
}

function zoneBlock(zone: OutZone): string {
  return `  { zoneName: ${JSON.stringify(zone.zoneName)}, quests: [\n${zone.quests
    .map(questLine)
    .join(",\n")}\n  ]}`
}

export function generateTemperQuest(
  rows: readonly Page[],
  catalogDomains: readonly Page[]
): string {
  const zones = rows
    .filter((row) => row.zoneQuests !== undefined)
    .map(zoneOf)
    .sort((a, b) => a.zoneName.localeCompare(b.zoneName))
  const questCount = zones.reduce((held, zone) => held + zone.quests.length, 0)
  return `\
/**
 * Quest Static Data (Generated)
 *
 * ${zones.length} zones, ${questCount} quests
 *
 * apiVersion: ${versionOf(catalogDomains)}
 * DO NOT EDIT — regenerate with: ops temper catalog generate quest
 */

interface QuestEntry {
  questId: number
  name: string
}

interface QuestZoneEntry {
  zoneName: string
  quests: readonly QuestEntry[]
}

export const questData: QuestZoneEntry[] = [
${zones.map(zoneBlock).join(",\n")}
]
`
}
