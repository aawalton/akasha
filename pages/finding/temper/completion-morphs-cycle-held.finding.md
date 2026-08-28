---
id: 29071e65-b7dc-5c65-bb30-22e8a4d57563
slug: completion-morphs-cycle-held
page-type-slug: finding
title: "Completion morphs cycle held"
domain-slug: domain/temper
---

# Claim

`temper/player/completion/addon` and `temper/game/characters/skills/morphs/addon` import each other as live source in both directions. The modules they share, `saved-variables` and `ui/task-progress-resolver-types`, sit inside the completion addon rather than in a third workspace, so the morphs side reaches them by relative path into another workspace's `src/`, a direction it declares no dependency for. The cycle stands as the one approved entry in `ALLOWED_CYCLES`, so nothing reports it.

# Evidence

Measured in `~/code` at `a5a5580da4`.

`packages/infra/checks/src/lib/check-tsconfig-allowlists.ts` holds one entry across its five sets: this pair, in `ALLOWED_CYCLES`. The other four sets are empty declarations. Alan approved the entry on 2026-08-09 closing #18131, on the ground that releasing it is an addon refactor with TSTL bundling reach rather than a tsconfig repair. It carries `WHAT KEEPS IT STANDING` and `WHAT WOULD RELEASE IT` beside it.

Morphs into completion: five specifiers across four modules, each a relative path of the form `../../../../../../../player/completion/addon/src/...` — `tracking/skill-morphs.ts`, `ui/task-auto-complete-skill-morphs.ts`, `ui/task-progress-resolver-skill-morphs.ts` (which also takes `TaskProgress` from `ui/task-progress-resolver-types`) and `ui/task-hud-skill-morphs.ts`. The morphs addon's `package.json` declares `@temper/game-completion` but no dependency on the completion addon.

Completion into morphs: twelve occurrences of `@temper/game-characters-skills-morphs-addon` across eleven files, nine of them live import or re-export specifiers in eight modules, one a test mock path, two prose comments. This direction is declared in the completion addon's `package.json`.

Not measured. The stated ground for there being no runtime cycle is that the sides bundle separately. The morphs `tsconfig.json` does declare `luaBundle: "TemperSkillsMorphsAddon.lua"`, but I ran neither bundle and confirmed neither that each inlines the cyclic modules nor what ships that file — the morphs workspace has no `addon.json`, and `TemperCharacters` does not name the file. I did not measure what the extraction would cost.
