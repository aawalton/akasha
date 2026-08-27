---
id: d547246e-230e-5168-b4c7-cb084a324ea9
page-type-slug: finding
title: "Tailwind source comments rest on todays directives"
domain-slug: repo/code-repo
---

# Claim

`check-tailwind-sources`'s header advises preferring workspace paths over `node_modules/` paths, where its rule would refuse a `node_modules/`-routed directive outright. The helper's own comment calls the string comparison equivalent to the realpath version it replaced, resting that on a property of today's directives rather than of the comparison. Neither is reached: the check enumerates no apps.

# Evidence

Read against `~/code` at `383bf60d35`.

`check-tailwind-sources.ts:18` reads: "Prefer workspace paths (`../../../shared/...`) over `node_modules/` paths: Docker builds with hoisted linkers can skip symlinks and silently drop classes." That is advice.

The rule does not advise. `coversBidirectional` at `lib/tailwind-sources-violations.ts:213` is three string comparisons on repo-relative posix paths — equality and either-direction prefix — with no symlink step. `resolveDirectiveBase` at `shared/graph/producers/src/file/css-file/classify.ts:40` builds those paths with a lexical `resolve` plus `existsSync` and nothing else. A base under `node_modules/` contains a workspace's `packages/…/src` in neither direction, so the `missing-source` arm would fire on the very workspace the directive was written to cover.

The comment above the helper, at lines 204-212, states the condition and reads past it. It calls the comparison "byte-equivalent" to the legacy `coversPackage`, whose `realpathSync` it says "was load-bearing only for `node_modules/`-anchored paths" — the one case where the two are not equivalent — resting that on "every `@source` directive in this monorepo resolves to a workspace path". Enumerated here: seven `globals.css` files carry 55 `@source` lines, one an `@source inline(...)`, none `node_modules/`-anchored. So what the comment calls a property of the comparison is a property of today's directives.

Neither sentence is currently reachable. `APP_WS_RE = /^packages\/[^/]+\/next$/` at line 83 matches no workspace — every app stands at `packages/<ns>/web/app/` — so `enumerateTailwindApps` returns empty and `coversBidirectional` never sees a real directive. That empty predicate has since been settled on the code-check domain and taken into a repair for this check.

Which is what keeps these comments live rather than moot: whoever repairs the app predicate makes both bite in the same commit.

Found ingesting `dirty/questions/code-repo-check-stated-grounds.md`.
