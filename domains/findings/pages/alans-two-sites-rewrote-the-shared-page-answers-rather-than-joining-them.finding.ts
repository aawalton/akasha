import type { Finding } from "../finding.page-type.ts"

export const alansTwoSitesRewroteTheSharedPageAnswersRatherThanJoiningThem = {
  id: "01a0658e-a221-72d8-824a-9086ea7dd713",
  pageTypeSlug: "finding",
  slug: "alans-two-sites-rewrote-the-shared-page-answers-rather-than-joining-them",
  domainSlug: "workspace-package/web-page-answers",
  claim:
    "web-page-answers was made to be the one place the four page answers live, and the two sites that migrated after it wrote their own copies instead. Archive of worlds joined the package and holds none of its own, so the four answers are written out in three places rather than one.",
  evidence:
    "akasha/web-page-answers landed at ae2be6a53a holding answer-pages, answer-page-types, answer-page-write and nav-icon-svg, generalised so a site passes in what differs: answerPageWrite takes a writer argument, and buildNavIconSvg takes a color and a stroke width.\n\nakasha/alan/web then landed .server/alan-answer-pages, .server/alan-answer-page-types, .server/alan-answer-page-write and alan-nav-icon-svg. The first two are byte-identical to the package's. The other two are the pre-generalisation bodies, each hard-coding what the package takes as an argument. akasha/alan/atlas-web landed atlas-nav-icon-svg the same way, which infra/cluster-checks/src/lib/color-literal-grants.ts:27 now grants separately.\n\nArchive of worlds instead reaches @akasha/web-page-answers from routes/api.pages.$pageTypeSlug.ts, api.page-types.ts, api.page-write.ts and api.nav-icon.$idSuffix.ts, and its own four files went with the rest of archive-of-worlds/web.\n\nOne behaviour hides in the argument that was generalised away: archive of worlds and alan drew nav icons at stroke width 2.5 while temper drew at 2, and the package defaults to 2. Archive of worlds passes 2.5 back in. A site joining the package by deleting its copy and calling the default thins its icons with nothing reporting it.",
} as const satisfies Finding
