import type { Finding } from "../finding.page-type.ts"

export const theGateSpawnsAProcessForEveryBody = {
  id: "01a04d9d-bc96-7c4b-913d-fac6971e7b7f",
  pageTypeSlug: "finding",
  slug: "the-gate-spawns-a-process-for-every-body",
  domainSlug: "domain/command-system",
  claim:
    "Reading the bodies a change does not touch costs one `git cat-file` process each, and a one-file patch spawns 346 of them.",
  evidence:
    "`bodyAt` in `landing.module.code.ts` runs `execFileSync` on `git cat-file blob <base>:<path>`, and `leavingOf` calls it for every path the change does not carry, with no cache of any kind. Typecheck reads the folder twice over: `rootsOf` calls `leaving.at` on all 176 `.ts` files to keep the ones standing at base, then `bodiesOf` builds a second, separate memo and fetches every one of them again for the compiler. Counted with a shim on PATH, a one-file dry run made 347 git calls — 346 `cat-file` and one `rev-parse`. Timed alone, 352 such spawns cost 457ms of a gate that answers in 1.62s. One `git cat-file --batch` over the same 176 paths costs 12ms. That is a quarter of the gate's wall time spent forking for bytes git will hand over down one pipe, and it grows in proportion as more checks reach through the overlay, each reach being a fresh process. Recorded rather than fixed because a batch reader belongs to `landing` and wants a lifetime — opened once per change, closed after judging — and giving `Leaving` something that must be closed changes the shape every check is handed.",
} as const satisfies Finding
