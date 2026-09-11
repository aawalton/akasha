import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aNamePlaceCheckReachesTheVendoredLuaRuntime = {
  id: "01a07772-7a74-7f62-aa32-acacb074280a",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-name-place-check-reaches-the-vendored-lua-runtime",
  domain: "domain/check",
  claim:
    "`identifier-matches-its-place` reaches the vendored TypeScriptToLua runtime under language-design/lua-compiler/lualib/, whose names open with two underscores and so fail `lower-camel-case`. Those names are the compiler's, which emits calls to them, so obeying a refusal breaks the emitted Lua rather than restyling it. The check tests no boundary: `refusedIn` skips a declaration file and nothing else. A skip could be derived rather than listed, as `typecheck` derives one from the configs each lua-runtime-library page names. Narrowing what a check refuses is Alan's to approve, so this is filed rather than mended.",
  evidence:
    "`refusedIn` at checks/code-checks/pages/identifier-matches-its-place/identifier-matches-its-place.code-check.decision.code.ts:216 opens `if (declaring(at)) return []`, and `declaring` tests for `.d.ts`. There is no other skip, so every tracked `.ts` and `.tsx` is reached. The page states that reach as settled rather than as a fault: `The places hold for the whole repo.` and `This judges where the repo has arrived.` are both absences on identifier-matches-its-place.code-check.ts. `lualib.lua-runtime-library.ts` is the page for the vendored tree, and `lua-runtime-library.page-type.ts` says a file there carries no page of its own. `foreign-name.name-place.ts` covers such names, saying a name is its owner's where renaming it would break a reader outside akasha, and that the place licenses a name rather than a folder, so it licenses no folder skip on its own. The derived skip to reuse is `claimedIn` in typecheck.code-check.decision.code.ts, which walks the index for every `.lua-runtime-library.ts`, reads the configs named by `universal-config` and `lua50-config` and builds matchers from their `include` globs; it parts `lualib/src` from the `tstl-*` modules beside it, which are akasha's own and stay judged. Reusing it means lifting `claimedIn` into a module both checks import, since copying it would be refused by `no-rule-in-two-files`. How many names the check refuses there today is unmeasured here, and `akasha audit --check identifier-matches-its-place` settles it.",
} as const satisfies Finding
