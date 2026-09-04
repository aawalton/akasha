import type { Finding } from "../finding.page-type.ts"

export const theAkashaToolchainIsCompiledIntoAlansPhone = {
  id: "01a05d44-6b21-7a03-8c5e-4f9d20e17b38",
  pageTypeSlug: "finding",
  slug: "the-akasha-toolchain-is-compiled-into-alans-phone",
  domainSlug: "router-app/alan-web-capacitor",
  claim:
    "Sixty-one node-only modules are compiled into Alan's iOS app, and the build that ships them exits 0.",
  evidence:
    'TestFlight 197 opens to `HydrateFallback` and never leaves it. A lane built `18c549a94c` in a detached worktree, served `build/client`, and read it in Playwright: one console error, zero failed requests, `dataset.appReady` null, 15 skeleton nodes, `body.innerText` empty. The error is `Module "node:path" has been externalized for browser compatibility`, thrown from `checkout-roots.module.code.ts:46` under the module-scope `export const CHECKOUT_HERE = checkoutHere()` at `:55`. The chunk `dialog.module.code-B0QWJBfq.js` carries the same content hash in `~/.mobile-cut-build`, the worktree 197 was built from, so this is what shipped. Client modules reaching a node builtin count 61, over nine builtins — `async_hooks`, `child_process`, `crypto`, `fs`, `fs/promises`, `module`, `os`, `path`, `url` — in a 1.24 MB chunk holding `repo/git/git.ts`, `repo/push/push.ts`, `page/index/store/store.ts`, `tools/lib/seat-*` and `akasha/file-system/lock-holder`. A Rollup `buildEnd` sweep over `getModuleInfo().importers` resolves five entry chains, all through `shared/pages-query/src/asking.ts`. The fatal one is eager: `app-capacitor/root.tsx:13` to `@akasha/pages-ui-store/singleton` to `store.module.code.ts:1` to `@akasha/pages-access/file-read` to `@shared/pages-query/ask` to `here.ts:4` to `checkout-roots`. `store.module.code.ts` imports one symbol from `file-read`, the ten-line `RosterUnreachable` at `:78-87`, and pays the whole node tree for it. Two commits welded it, each harmless alone: `096355e984` added that import, `387a8ccb47` added `@shared/pages-query/ask` to `file-read`. Both precede `18c549a94c`. Vite externalization throws at runtime and never at build, so `react-router build` exited 0 on a bundle that cannot execute.',
} as const satisfies Finding
