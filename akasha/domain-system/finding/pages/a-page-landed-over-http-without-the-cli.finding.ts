import type { Finding } from "../finding.page-type.ts"

export const aPageLandedOverHttpWithoutTheCli = {
  id: "01a05ac1-a1d0-719b-9fbf-0e1c9fa7c997",
  pageTypeSlug: "finding",
  slug: "a-page-landed-over-http-without-the-cli",
  domainSlug: "workspace-package/pages-system",
  claim:
    "This page was written by a POST to the page store rather than by the akasha command line. Nothing typed it into the worktree and no check judged it. The service wrote it, indexed it and committed it in one go, authored by the writer the request named.",
  evidence:
    "Sent to http://127.0.0.1:8787/write as JSON carrying `writer`, `message` and one `puts` entry holding this file's whole body. The answer named the commit it landed as, and the paths it wrote. The service was running the code committed one second earlier, restarted by the wrapper that follows the files it imports.\n\nWhat this proves and what it does not: it proves a page reaches the store over HTTP from a workstation, which is what the intent asked. It does not prove anything about the checks, because the write route is built on the same landing every akasha command uses but handed a judging that judges nothing. That is deliberate and the package says so. It means a body that no check would pass can land this way. Whoever opens the store to a caller other than a workstation should read that sentence again first.",
} as const satisfies Finding
