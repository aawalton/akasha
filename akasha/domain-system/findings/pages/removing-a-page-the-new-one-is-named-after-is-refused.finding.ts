import type { Finding } from "../finding.page-type.ts"

export const removingAPageTheNewOneIsNamedAfterIsRefused = {
  id: "01a06348-077e-701d-a2c1-dda5893eb0aa",
  pageTypeSlug: "finding",
  slug: "removing-a-page-the-new-one-is-named-after-is-refused",
  domainSlug: "workspace-package/command-system",
  claim:
    "A migration that keeps a slug cannot delete what it replaced. `akasha remove` looks for the last part of each path as text in every tracked body, so the new page naming the old page's slug reads as a file still naming it, and the removal is refused. The cost is the second wall: one call over two paths takes 28 seconds, because every tracked body is read once for each path named, so a folder of 4,422 files does not finish.",
  evidence:
    "`akasha remove --dry-run --file-path pages/heard-music` was refused for 4 files still naming it. Three are the old system's own definitions and go in the same act. The fourth is `akasha/alan/music/listening/music-listening.domain.ts`, the new domain, which names `page-type/heard-music` because the new page type carries the slug the old one carried. No deletion resolves that one. The same call took 28 seconds over 2 paths. A call naming `pages/music-song`, `pages/artist`, `pages/music-day`, `pages/heard-music`, `tools/commands/music` and eight command documents ran 55 minutes without answering and was stopped.",
} as const satisfies Finding
