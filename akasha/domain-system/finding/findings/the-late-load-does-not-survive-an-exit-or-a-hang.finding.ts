import type { Finding } from "../finding.page-type.ts"

export const theLateLoadDoesNotSurviveAnExitOrAHang = {
  id: "01a04d9d-bc96-71ba-87c6-cdd3b72b96d7",
  pageTypeSlug: "finding",
  slug: "the-late-load-does-not-survive-an-exit-or-a-hang",
  domainSlug: "domain/command-system",
  claim:
    "The guard that turns a checks module which will not load into a refusal cannot catch a module that calls `process.exit` or one that never returns, and either kills the command outright.",
  evidence:
    "`gateBuilt` wraps `checkingLoaded` in a try/catch, which covers every way loading can throw — the module will not parse, an export it names is gone, top-level code throws, a check page will not load — and the command refuses with exit 3 and offers the glass. Two ways of failing are not throws, and a catch cannot reach past either. Reproduced on a copy of the folder: append `process.exit(9)` to `checking.module.code.ts` and the command exits 9, no refusal printed and the catch never entered; append `while (true) {}` and the command never returns and has to be killed. Neither shape is exotic. A module that decides it cannot run and exits is ordinary elsewhere, and a hang is what a top-level await on something that never settles looks like. What makes it worth recording is the promise the late load makes: reaching a command never asks the checks to load, and checks that will not load refuse the change. Under an exit the change is not refused, it is abandoned under an exit code nothing in `cli.module.code.ts` chose, and a caller cannot tell it from the checks having refused. Recorded rather than fixed because the only real defence is loading the checks in a process of their own under a timeout, which is a far larger change to how a gate is built than the try/catch it would replace.",
} as const satisfies Finding
