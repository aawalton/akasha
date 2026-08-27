---
id: da5b16e6-9d24-5c42-8b00-125ff2b4fcf8
page-type-slug: ops-command
title: "Ops mobile sim open-url"
slug: ops-mobile-sim-open-url
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/mobile/sim/open-url.ts
path: mobile sim open-url
---

# Definition

- **Ops mobile sim open-url** — a route open in the sim's webview under an injected identity, with the session left running.

# Help

Open a route in the sim's WKWebView: reuse (or create) the WebDriver session, mint a Supabase session and inject it into localStorage, navigate to `capacitor://localhost<route>`, and re-acquire the webview context. This is the entry to a driving loop — after it, `tap`/`type`/`eval`/`screenshot` reuse the persisted session. Ensures Appium is up and a sim is booted first. By default the injected identity is the THROWAWAY browser-test user; `--as-real-user` instead injects Alan's LIVE session so owner-owned surfaces (Stories nav, story chapter — every non-`app` page the throwaway is RLS-blind to) become observable. READ-ONLY, ALWAYS under --as-real-user: use it for reads / verification only — never mutate (type/edit/create/delete) through Alan's live session; mutations stay on the throwaway.
