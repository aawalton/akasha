import type { Finding } from "../finding.page-type.ts"

export const thePageStoreNowAnswersAnyBodyUnderAkasha = {
  id: "01a05b34-b267-7443-82fe-92d2d4224aa7",
  pageTypeSlug: "finding",
  slug: "the-page-store-now-answers-any-body-under-akasha",
  domainSlug: "workspace-package/pages-system-service",
  claim:
    "`POST /read` hands any caller the whole body standing at any path under `akasha/`, out of the commit at HEAD. Until now the store answered only the keys a page declares. Whoever reaches the store reads the tree.",
  evidence:
    "The route takes `{paths}` or `{pages}` and answers `{at, bodies, unplaced}`. It refuses a path outside `akasha/` and a path reaching above the root, and it refuses nothing else. A `.sops.yaml` beside a page is a path under `akasha/`, so its ciphertext is answered like any other body.\n\nWhat this does not widen: a value a page holds uncommitted never reaches this, because bodies are read out of the commit rather than off the working tree. And `removeFiles` already let any caller take away any path under `akasha/` unchecked, so `removePage` placing that write by page type and slug adds convenience rather than reach.\n\nWhat it does widen is reading. The store binds `127.0.0.1`, `::1` and `workstation.alanwalton.ts.net`, so the tailnet reads the tree over this route. That is the same tree a pod already reaches over the tailnet to ask questions of, and the same tree git carries, so nothing here is secret that was not already.\n\nThe call taken, Alan being asleep: serve it. A patch cannot be honoured without a whole body and a version to compare, and the alternative is a client that reads the file itself, which no pod can do. The write route still runs no check, and that stands unchanged by this work — see a-page-landed-over-http-without-the-cli. Whoever opens the store past the tailnet reads both findings first.",
} as const satisfies Finding
