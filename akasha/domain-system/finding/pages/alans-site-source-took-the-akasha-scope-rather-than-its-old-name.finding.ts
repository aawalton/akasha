import type { Finding } from "../finding.page-type.ts"

export const alansSiteSourceTookTheAkashaScopeRatherThanItsOldName = {
  id: "01a05bb1-0c05-7529-8730-25da30a6021e",
  pageTypeSlug: "finding",
  slug: "alans-site-source-took-the-akasha-scope-rather-than-its-old-name",
  domainSlug: "domain/akasha-migration",
  claim:
    "The call to keep the name `@alanwalton/web` answers a question about the site's own package at the end of its move rather than about the package standing up at the start of it. The two cannot share a name while both stand, so the new one was named `@akasha/alanwalton-web`. The scope risk argued against that name is one this site already carries eight times over, and it is untouched here because the site's own package has not moved.",
  evidence:
    '`alanwalton/web/package.json` still states `"name": "@alanwalton/web"` and keeps the rest of the site through two further intents, so two workspace members would have carried one name. The new package is a leaf the site reaches rather than the site itself, and its inbound is three specifiers rather than the zero counted for `@alanwalton/web`: `app/routes/page-detail.tsx`, `app-capacitor/routes/page-detail.tsx` and `app/lib/capability-registrations.ts`.\n\nThe scope asymmetry is real and unchanged: `node_modules/@akasha` is a folder of one symlink per package written by `bun install`, and `bun install` wrote `node_modules/@akasha/alanwalton-web -> ../../akasha/alanwalton-web`. What that argument weighs against is moving the package that is the live site into that scope. This site already names seven packages there, among them `@akasha/pages-core`, `@akasha/awen-core` and `@akasha/voice-core`, and is live at `283599af2e`, so an eighth adds no kind of risk it does not already run.\n\nThe other shape was open and was not taken. A package under `akasha/` reaches the whole-scope symlink `@alanwalton -> ../alanwalton` only through a tracked symlink placed under `alanwalton/`, as `alanwalton/native-shell` does at mode 120000. That is machinery whose only work is holding a name, and every akasha package landed tonight went the other way: `personas-core` at `04066f6e01` and `awen-core` at `609d0e9551`.\n\nWhat stays open is the site\'s own package at the end of the move, where the argument does apply and nothing here forecloses it.',
} as const satisfies Finding
