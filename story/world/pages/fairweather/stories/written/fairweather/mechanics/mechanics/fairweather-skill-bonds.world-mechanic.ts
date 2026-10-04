import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const fairweatherSkillBonds = {
  id: "01a106e8-584a-77f1-86d4-2c13e65d7254",
  type: "page-type/world-mechanic",
  slug: "fairweather-skill-bonds",
  title: "Skills and bonds",
  world: "world/fairweather",
  description:
    "Elsie's skills move a bond, up or down, beside the moments of fairweather-bond-moments. A girl giving leave for a skill, or asking that one be kept on, is a moment there, the +5 turning point, and no skill move. The moves: +1 when Elsie uses Captivate or Hold on a girl by her leave, on the beat it ends. +2 when a girl under Elsie's Tether comes back to herself along it, out of a Frenzy, a fear or a faint she could not master, on the beat she is back. +1 on a chapter's last beat for each girl then under Elsie's Tether by her own wish. −5 when any skill is used on a girl without her leave or against her wish, or kept on her after she asks it off, on the beat it takes hold or she asks: this is the breach of fairweather-bond-moments, counted once and never as a moment as well. A skill used without leave only to save her life, as the Accord allows, moves nothing of itself, and the life saved is its own turning point. A skill Elsie gains later states its move on its own page, or moves nothing. A skill's move stands outside the scene's largest-gain rule and the chapter's cap of 5, adds to whatever moment the same beat earns, and moves a girl's bond at most once a scene for each skill, the chapter's-end Tether line aside. Its note names the skill and the moment, as `Bond: Tamsin 20 → 22 (Tether: back from the Frenzy)`.",
} as const satisfies WorldMechanic
