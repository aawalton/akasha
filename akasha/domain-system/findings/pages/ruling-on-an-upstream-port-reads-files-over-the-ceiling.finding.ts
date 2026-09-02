import type { Finding } from "../finding.page-type.ts"

export const rulingOnAnUpstreamPortReadsFilesOverTheCeiling = {
  id: "01a06039-c825-7e98-b879-4d308ce709ff",
  pageTypeSlug: "finding",
  slug: "ruling-on-an-upstream-port-reads-files-over-the-ceiling",
  domainSlug: "workspace-package/temper-upstream-data",
  claim:
    "The four modules that rule on whether a ported upstream library still matches the game read the ported data itself, and four of those generated files run from twice to twenty times the 15,000 byte ceiling. Even once the Lua machine reaches akasha, ruling on a port cannot follow until the ported data is split or the ceiling is settled. Splitting a generated file means changing what generates it, which is beyond this seat's reach.",
  evidence:
    "Walking every import from the four verifiers reaches 437,199 bytes of generated data. Over the ceiling: `temper/shared-addon-libraries-lib-zone/src/generated/zone-data.generated.ts` at 304,862 bytes, `temper/shared-addon-libraries-lib-map-data/src/generated/map-data.generated.ts` at 41,324, `temper/shared-addon-libraries-lib-treasure/src/generated/treasure-pins-data.generated.ts` at 34,022, and `temper/shared-addon-libraries-lib-zone/src/generated/geo-data.generated.ts` at 29,953. Housing is already split into six files and every one fits, the largest being `library-data-eu-1.generated.ts` at 13,692 bytes, so the shape the others need is one this repository already writes. The four `port.ts` modules read none of this and are blocked only by the Lua machine. This is the same ceiling the initiative's first intent records as holding 570MB of captures out.",
} as const satisfies Finding
