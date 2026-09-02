import type { Finding } from "../finding.page-type.ts"

export const aLandedPackageNowImportsTheDeclarationFileThatDoesNotParse = {
  id: "01a060b9-349d-7705-af85-206ed3cc48d0",
  pageTypeSlug: "finding",
  slug: "a-landed-package-now-imports-the-declaration-file-that-does-not-parse",
  domainSlug: "workspace-package/temper-eso-types",
  claim:
    "`@akasha/temper-bit-codec` is red. Its `base64url` module imports `@akasha/temper-eso-types/tstl-eso-sandbox`, and that file carries fifteen malformed optional markers, so a plain typecheck of the package answers 51 parse errors. The same typecheck with `base64url` left out answers none. The malformed markers are no longer a bar on work waiting to land; they are a fault inside akasha.",
  evidence:
    "Measured with `@typescript/native-preview` over `akasha/temper/temper-bit-codec/**/*.ts` with `skipLibCheck` on: 51 errors, every one of them in `akasha/temper/temper-eso-types/tstl-eso-sandbox/tstl-eso-sandbox.type-declaration.d.ts`, none in a `temper-bit-codec` file. Excluding `akasha/temper/temper-bit-codec/base64url/**` from the same run: 0 errors. So line 2 of `base64url/base64url.module.code.ts` is what draws the file in.\n\n`skipLibCheck` cannot help here. It suppresses type errors in a declaration file and not parse errors, and `TS1005`, `TS1131` and `TS1128` are parse errors.\n\nThe malformed shape is `__add?: ?(this: T, operand: unknown) => unknown` at lines 9 to 27, fifteen members of `LuaMetatable`. The `?` between the colon and the parenthesis is not TypeScript.\n\nThe other four packages that import `temper-eso-types` are clean, because none of them names anything the sandbox file declares. `temper-capture-perf`, `temper-trading-post`, `temper-trading-pricing`, `temper-trading-pricing-client` and `temper-trading-listings` each typecheck with nothing to say, and their programs hold `eso-globals`, `eso-event-manager`, `eso-events`, `eso-functions-01`, `eso-enums-07`, `eso-enums-08` and `eso-enums-11` without ever reaching the sandbox file.\n\nSo the blast radius is one import on one line, and the repair is fifteen characters in the file that is imported.",
} as const satisfies Finding
