import type { Finding } from "../finding.page-type.ts"

export const nothingNowTriesTheChecksThatWillNotLoad = {
  id: "01a06241-cdc9-7a38-a58a-519f17f9bd82",
  pageTypeSlug: "finding",
  slug: "nothing-now-tries-the-checks-that-will-not-load",
  domainSlug: "domain/akasha-system",
  claim:
    "Nine cli tests copying the whole `akasha/` folder were deleted for running well past five seconds. Eight of the nine were already duplicated by faster tests elsewhere. The ninth behaviour — a gate that would not build, refusing a change whole without the glass and carried by it with the reason in the commit — is now tried by nothing, and three invariants on `landing.module.ts` rest on it alone.",
  evidence:
    "Measured 2026-09-02 at ec65974a09. Before: `cli.module.test.ts` ran 27 tests in 87.4s, 111.3s, 128.1s and 250.2s over loads 13.7 to 25.6, its `afterAll` sweep failing 4 of 4 at 14.3s, 16.1s, 20.5s and 20.8s against bun's 5s. After: 18 tests, 10 green runs of 10, 0.30s to 0.33s at load 13.5 and 0.78s to 1.69s at loads 26.8 to 34.0. The whole suite is 5232 of 5232 in 114.9s. Duplication was checked string by string: `piping.module.test.ts` 120, 124 and 134 hold the three marker refusals; `edit.command.test.ts` 105 and 126 hold both substitution refusals and 390 holds every flag it takes; `write.command.test.ts` 274 and 275 hold `nothing is piped in` and the heredoc; `calling.module.test.ts` 215 to 261 holds the help. Only `Checks-unloadable` and `the checks could not be loaded from` were nowhere else, and `landing.module.ts` 193 to 201 rests on them. `gate-building.module.code.ts` binds the checks to `join(HERE, CHECKING_AT)`, HERE being the repo that code itself sits in, so nothing running in this repo can make that path fail — which is why the deleted tests copied 33193 files to raise a second akasha and corrupt it. It is reachable cheaply: a root whose minted check has lost its `.code.ts` file builds no gate, as `checking.module.test.ts` 119 shows. Its home is `asking.module.test.ts`, 14955 bytes against a 15000 ceiling, which has no room for it.",
} as const satisfies Finding
