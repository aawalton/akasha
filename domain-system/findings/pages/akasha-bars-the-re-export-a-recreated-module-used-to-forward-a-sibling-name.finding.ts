import type { Finding } from "../finding.page-type.ts"

export const akashaBarsTheReExportARecreatedModuleUsedToForwardASiblingName = {
  id: "01a06307-dd2b-78f5-9327-93454eff053b",
  pageTypeSlug: "finding",
  slug: "akasha-bars-the-re-export-a-recreated-module-used-to-forward-a-sibling-name",
  domainSlug: "domain/temper",
  claim:
    "A file inside akasha exports only names it declared itself, so a legacy module that forwarded a sibling's name loses that forwarding when it is recreated. The name survives at its declaring module; what goes is the second way in. A caller that reached the name through the forwarding module must be repointed, and nothing in the recreation marks that the way in was dropped.",
  evidence:
    "Met while recreating `temper/game-characters-skills-morphs-addon` as `akasha/temper/temper-characters-skills-morphs-addon`, landed at `a887c313be`. The legacy `src/ui/task-auto-complete-skill-morphs.ts` declared `countEnrichmentSlots` and carried `export { isSkillMorphTaskComplete }`, forwarding a name declared in its sibling `task-hud-skill-morphs.ts`. Handing that body to `akasha write` was refused: 'line 7 sends on `isSkillMorphTaskComplete`, which came from `../skill-morph-task-hud/skill-morph-task-hud.module.code.ts` — a file inside akasha exports only the names it declared itself'. The forwarding line was dropped and the write then passed 40 checks over 14 paths. `isSkillMorphTaskComplete` is still there, exported from `skill-morph-task-hud`, so nothing is lost from the package's whole surface; the legacy package exported 13 symbols across 5 files and the recreation exports the same 13 across 5 modules, with the one duplicate way in gone. The refusal is a judgement rather than a read debt, so it does not clear on a retry.",
} as const satisfies Finding
