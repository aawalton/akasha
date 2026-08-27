---
id: 11e058d6-c8ea-575a-b005-aaa2945f3235
page-type-slug: finding
title: "Seam facts with no document"
domain-slug: domain/native-shell-seam
---

# Claim

Four facts the shared iOS seam depends on are written down nowhere, and a fifth about the relay lives only in a project's notes, which are deleted when the project is.

`No Code Comments` sent the reasoning out of `monarch-url.sh`; no document received it. Adding these lines is `Every Changed Line`'s to release, so they wait rather than land.

# Evidence

Raised by #19015 on 2026-08-14 and re-measured by the lead at `527bae2a41`. Four lines proposed for `native-shell-seam`'s Design, in that seat's words:

- The Monarch link the tile's tap opens is authored here, and neither shell spells it.
- That link's host is `app.monarch.com` and its path sits under `/links/`.
- Universal-link matching ignores that link's query.
- A shared value the shells' Swift carries is emitted by a function, never expanded inside a seam's heredoc.

The third is measured rather than assumed: Monarch's `apple-app-site-association` declares one detail, appID `4F5W7HFZTJ.com.monarchmoney.mobile`, `"paths": ["/links/*"]`, in the legacy `paths` form. `components` is the only form that can express a query condition and is absent, so nothing there distinguishes `/links/transactions` from the same path carrying a query. The fourth is why the last commit exists: an unquoted heredoc would run the plugin's doc-comment backticks as command substitution, so the value is emitted by a call between two quoted heredocs inside one redirect group.

The fifth fact belongs to the relay in each shell rather than to the shared seam, which is why the seat could see no single owner for it: iOS does not fire a universal link for a Safari navigation within the same domain, and Monarch's interstitial offers an "open in web" choice that sets a per-domain preference. Alan tested it — the tile still opens the Monarch app. The relay calls `UIApplication.open` with `universalLinksOnly: true` from another app, which is a different entry point, and the preference does not reach it. So the fallback leg is rarer than the comments around it imply.
