import type { Finding } from "../finding.page-type.ts"

export const theUtilsAndLuaAstSplitLandedWholeInTwoNewModules = {
  id: "01a06798-4d53-7003-97b5-1d133729238a",
  pageTypeSlug: "finding",
  slug: "the-utils-and-lua-ast-split-landed-whole-in-two-new-modules",
  domainSlug: "workspace-package/lua-compiler",
  claim:
    "The old `lua-compiler/src/utils.ts` and `src/transformation/utils/lua-ast.ts` were split out while landing at `akasha/language-design/lua-compiler`. Three agents auditing the landing independently hit the same difficulty mapping the old files to their destinations — a piece three readers cannot place is a piece whose home is missing. Both files in fact landed wholesale, each into one new module, and that mapping belongs on the destination pages rather than being re-discovered by each reader.",
  evidence:
    "Verified by grepping every exported name from the backup copy of both old files against `*.code.ts` under the landed package. `src/utils.ts`'s twelve exports (`castArray`, `intersperse`, `union`, `intersection`, `createDiagnosticFactoryWithCode`, `createSerialDiagnosticFactory`, `normalizeSlashes`, `trimExtension`, `formatPathToLuaPath`, `getOrUpdate`, `isNonNull`, `cast`, `assert`) all land in `tstl-utils/tstl-utils.module.code.ts`. `src/transformation/utils/lua-ast.ts`'s twelve exports (`unwrapVisitorResult`, `createSelfIdentifier`, `addToNumericExpression`, `getNumberLiteralValue`, `createUnpackCall`, `createBoundedUnpackCall`, `isUnpackCall`, `wrapInTable`, `wrapInToStringForConcat`, `createHoistableVariableDeclarationStatement`, `createLocalOrExportedOrGlobalDeclaration`, `createNaN`) all land in `tstl-lua-ast/tstl-lua-ast.module.code.ts`. Neither destination page, `tstl-utils.module.ts` nor `tstl-lua-ast.module.ts`, says where its content came from. One of the agents that hit this wall ran as task `a1ad2e19b415323f3`, accounting for 115 unmatched old files by TS-compiler export extraction rather than regex, seeded against an invented fault name to confirm its checker was not blind to a genuinely missing export.",
} as const satisfies Finding
