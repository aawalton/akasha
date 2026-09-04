import type { Initiative } from "../initiative.page-type.ts"

export const olwenDomainCleanup = {
  id: "01a06d80-f837-7845-8ef8-bfccd653aab4",
  pageTypeSlug: "initiative",
  slug: "olwen-domain-cleanup",
  domainSlug: "workspace-package/domains",
  personaSlug: "olwen",
  constraints: [
    "The folder is named `domains/`, the plural, as `pages/` is named for `page`. Alan settled this against `domain/`.",
    "`purpose` is re-slugged `domain-purpose` and takes a folder of its own, as `domain-championing` and `domain-parent` do.",
    "The five `domain-*` folders keep their names against `openingWith`, as `pages/` carries 8 of that refusal unremediated. Alan settled this against renaming them.",
  ],
  intents: [
    {
      statement: "All domain files are organized in the domains/ folder.",
      workingMemory:
        "`domains/` holds all of it at fc05dced9d and `domain-system/` holds nothing. The domain page type sits at the root beside the package at 96b98dfe and c62a9c52, pairing as `page` does with `pages`. 83 spellings of `@akasha/domain-system` became `@akasha/domains` at ba41d858. A resolver probe answers for the live names and refuses the retired one and a nonsense one, and a stale node_modules link had been masking the retired name.",
    },
    {
      statement: "The domains/ folder passes the folder-matches-a-shape check.",
      workingMemory:
        "7 refusals stand. 5 are `openingWith` on the `domain-*` folders, which Alan took over renaming them. The root and `domains/commands` clear together once the `domain` command reaches `commands/domain`, which another agent is landing command by command. Typecheck cannot judge any of this: `importersOf` throws whenever the index is behind HEAD, and under this many agents it always is.",
    },
  ],
} as const satisfies Initiative
