import type { Finding } from "../finding.page-type.ts"

export const aMechanicalLandingSeedsDebtTheNextGatedChangePays = {
  id: "01a06589-26a4-71e2-8163-d08bf490ceae",
  pageTypeSlug: "finding",
  slug: "a-mechanical-landing-seeds-debt-the-next-gated-change-pays",
  domainSlug: "router-app/alan-web",
  claim:
    "A file landed mechanically enters akasha unjudged, and the gate then refuses the next agent-authored change to it on debt that agent did not write. The debt is invisible until someone tries a gated edit, and the cheapest way out is another mechanical landing, so the file is never judged and the debt compounds. Migrating a package by mechanical batch therefore hands every later toucher of that package a choice between paying for someone else's file or bypassing the gate again.",
  evidence:
    "A one-line import repoint in `akasha/alan/web/alan-auth-provider/alan-auth-provider.module.test.tsx` and `akasha/alan/web/device-secret-sync/device-secret-sync.module.test.tsx` was refused by `akasha edit` on twenty-one findings, none of them the change: four constants not in `name-format/upper-snake-case` (`trail` and `fakeSupabase` in the first file, `apiCalls` and `plugin` in the second), fifteen lines carrying prose in none of the code comment forms, and a `no-double-cast` at alan-auth-provider line 126 where an assertion reaches its target through `unknown`.\n\nEvery one of those came in with the mechanical move of `alanwalton/web/app` into `akasha/alan/web`. The repoint itself was landed with `landedMechanically`, which is what the migration sanctions and which runs no check — so the debt is still there for whoever edits those two files next.\n\nThe same is true of the whole package: `akasha/alan/web` holds 332 files landed the same way. The refusals above are what two of them cost.\n\nTwo further shapes the gate named on files nothing claims: `akasha/alan/web/tunnel-routes.ts` is refused as `no page claims this file`, and its exported `routes` constant is refused for not being upper snake case — but `infra/k8s/src/cloudflared/discover-routes.ts:36` finds tunnel files by name and reads that export, so the name cannot change. `akasha/audhdalan/audhdalan-web/tunnel-routes.ts` and the two web apps' `server.ts`, `vite.config.ts`, `.gitignore` and `deploy/secrets.sops.yaml` are unclaimed by any page in the same way.",
} as const satisfies Finding
