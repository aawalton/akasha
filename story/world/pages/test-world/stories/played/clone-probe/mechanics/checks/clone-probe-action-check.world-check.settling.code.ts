import { metricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Named,
  type Settled,
  type Term,
  tieredSettled,
} from "akasha/story/world/mechanics/modules/tiered-roll/tiered-roll.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { testWorldLockpicking } from "akasha/story/world/pages/test-world/mechanics/skills/test-world-lockpicking.world-skill.ts"
import { testWorldSpark } from "akasha/story/world/pages/test-world/mechanics/skills/test-world-spark.world-skill.ts"
import { testWorldSwordplay } from "akasha/story/world/pages/test-world/mechanics/skills/test-world-swordplay.world-skill.ts"
import { cloneProbePlayer } from "akasha/story/world/pages/test-world/stories/played/clone-probe/characters/clone-probe-player.character-player.ts"
import { cloneProbePlayerAgility } from "akasha/story/world/pages/test-world/stories/played/clone-probe/mechanics/metrics/stats/clone-probe-player-agility.metric-character-stat.ts"
import { cloneProbePlayerStrength } from "akasha/story/world/pages/test-world/stories/played/clone-probe/mechanics/metrics/stats/clone-probe-player-strength.metric-character-stat.ts"
import { cloneProbePlayerWits } from "akasha/story/world/pages/test-world/stories/played/clone-probe/mechanics/metrics/stats/clone-probe-player-wits.metric-character-stat.ts"
import { cloneProbePlayerLockpicking } from "akasha/story/world/pages/test-world/stories/played/clone-probe/mechanics/skills-held/clone-probe-player-lockpicking.character-skill.ts"
import { cloneProbePlayerSpark } from "akasha/story/world/pages/test-world/stories/played/clone-probe/mechanics/skills-held/clone-probe-player-spark.character-skill.ts"
import { cloneProbePlayerSwordplay } from "akasha/story/world/pages/test-world/stories/played/clone-probe/mechanics/skills-held/clone-probe-player-swordplay.character-skill.ts"

const MOST_SKILL = 50

const STAT_MIDDLE = 10

const STAT_STEP = 3

const HELD = [cloneProbePlayerLockpicking, cloneProbePlayerSpark, cloneProbePlayerSwordplay]

const SKILLS = [testWorldLockpicking, testWorldSpark, testWorldSwordplay]

const STATS = [cloneProbePlayerAgility, cloneProbePlayerStrength, cloneProbePlayerWits]

const OWNED = `${cloneProbePlayer.slug}-`

type Termed = { readonly answered: Term } | { readonly refused: string }

function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

function skillTerm(said: string): Term | null {
  const held = HELD.find((one) => addressOf(characterSkill.slug, one.slug) === said)
  if (held === undefined) return null
  const skill = SKILLS.find((one) => addressOf(worldSkill.slug, one.slug) === held.skill)
  return { from: skill?.title ?? held.slug, by: Math.min(held.experience, MOST_SKILL) }
}

function statTerm(said: string): Term | null {
  const stat = STATS.find((one) => addressOf(metricCharacterStat.slug, one.slug) === said)
  if (stat === undefined) return null
  const name = stat.slug.slice(OWNED.length)
  const from = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return { from, by: (stat.value - STAT_MIDDLE) * STAT_STEP }
}

function listed(type: string, pages: readonly { readonly slug: string }[]): string {
  return pages.map((one) => `\`${addressOf(type, one.slug)}\``).join(", ")
}

function termOf(named: Named): Termed {
  if (named.skill !== undefined) {
    const term = skillTerm(named.skill)
    if (term !== null) return { answered: term }
    const held = listed(characterSkill.slug, HELD)
    return { refused: `\`${named.skill}\` is no skill held here; say one of ${held}` }
  }
  const said = named.stat ?? ""
  const term = statTerm(said)
  if (term !== null) return { answered: term }
  return {
    refused: `\`${said}\` is no stat here; say one of ${listed(metricCharacterStat.slug, STATS)}`,
  }
}

export function settled(reading: unknown, roll: Rolled | null): Settled {
  return tieredSettled(reading, roll, termOf)
}
