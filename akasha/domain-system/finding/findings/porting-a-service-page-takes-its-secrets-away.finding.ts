import type { Finding } from "../finding.page-type.ts"

export const portingAServicePageTakesItsSecretsAway = {
  id: "01a05a59-38f3-7101-a67a-9df4f6ec9c9e",
  pageTypeSlug: "finding",
  slug: "porting-a-service-page-takes-its-secrets-away",
  domainSlug: "page-type/workstation-service",
  claim:
    "Twenty-eight of the thirty-four workstation services standing today are handed every secret in the home secrets file by saying nothing about secrets, because the old reader defaults that field to true. The akasha property defaults the other way, so a service stating nothing is handed none. Copying one of those pages across unchanged therefore takes its secrets away, and neither the old page nor the new one says a word about it.",
  evidence:
    '`tools/lib/service-project.ts:76` reads the field as `booleanField(fm, "needs-secrets", true)`, so the default is true and omission means yes. Of the 34 pages under `pages/workstation-service/`, only six state the field at all, and all six state false: `dcgm-exporter`, `great-courses-sync`, `node-exporter`, `royal-road-sync`, `ttc-client`, `wandering-inn-sync`. The remaining 28 omit it and so are handed everything. In akasha, `needs-secrets.boolean-property.ts` carries the departure `A service stating nothing is handed none.`, which is the safer rule and the opposite one. `unit-writing.module.code.ts` writes the sourcing line only where the page states true, so the new text matches the new rule. The failure this sets up is quiet: a ported service starts, runs, and fails only where it reaches for a value that is no longer in its environment, which for a sync job may be its first call out. Six pages are already correct by accident. The other 28 each need the field written in as true at the moment they move, or need reading one at a time to find which of them truly wants nothing.',
} as const satisfies Finding
