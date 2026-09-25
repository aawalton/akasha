import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperCatalogImportPublicDungeons as page } from "akasha/command/pages/temper/catalog/import-public-dungeons/temper-catalog-import-public-dungeons.command.ts"
import {
  foldedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { putting } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import {
  PUBLIC_DUNGEONS,
  ZONE_IDS,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-sources/skill-point-sources.module.code.ts"
import { SKILL_POINT_PUBLIC_DUNGEON_SOURCES } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-public-dungeons/skill-point-public-dungeons.module.code.ts"

const NAMED = [] as const

const PUBLIC_DUNGEON = "temper-public-dungeon"

const MESSAGE = "make a page of each public dungeon that hands a skill point"

export type Source = {
  readonly key: string
  readonly id: number
  readonly zone: string
  readonly achievement: number
}

export type Labelled = { readonly key: string; readonly label: string }

export type Planned = { readonly namings: readonly Naming[] } | { readonly refused: string }

export function planned(
  sources: readonly Source[],
  labels: readonly Labelled[],
  zones: Readonly<Record<string, number>>
): Planned {
  if (sources.length !== labels.length) {
    return {
      refused: `the sources name ${String(sources.length)} public dungeons and the labels ${String(labels.length)}`,
    }
  }
  const seen = new Set<string>()
  const namings: Naming[] = []
  for (const [at, one] of sources.entries()) {
    const labelled = labels[at]
    if (labelled?.key !== one.key) {
      return {
        refused: `the label at ${String(at)} is for \`${String(labelled?.key)}\` rather than \`${one.key}\``,
      }
    }
    if (seen.has(one.key)) return { refused: `\`${one.key}\` is named twice` }
    seen.add(one.key)
    if (zones[one.zone] === undefined) {
      return {
        refused: `\`${one.key}\` is in \`${one.zone}\`, and the skill point finder gives that zone no id`,
      }
    }
    namings.push({
      pageTypeSlug: PUBLIC_DUNGEON,
      slug: one.key.toLowerCase(),
      values: {
        title: labelled.label,
        key: one.key,
        esoZoneId: one.id,
        zoneKey: one.zone,
        esoAchievementId: one.achievement,
        displayOrder: at,
      },
    })
  }
  return { namings }
}

async function imported(done: string[], argv: readonly string[], given: Given, landing: Landing) {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), INPUT)
  const plan = planned(PUBLIC_DUNGEONS, SKILL_POINT_PUBLIC_DUNGEON_SOURCES, ZONE_IDS)
  if ("refused" in plan) return refused(plan.refused, DATA)
  const folded = foldedFor(given.root, plan.namings)
  if ("refused" in folded) return refused(folded.refused, DATA)
  const landed = await landing(given.root, folded.puts.map(putting), MESSAGE, {
    agentId: given.agentId,
    writer: given.writer,
    done,
  })
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([`${MESSAGE}: ${String(folded.puts.length)} file(s)`])
}

export async function temperCatalogImportPublicDungeons(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await imported(done, argv, given, landing))
}
