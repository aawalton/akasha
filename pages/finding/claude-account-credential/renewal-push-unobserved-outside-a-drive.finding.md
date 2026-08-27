---
id: f6d86624-af7d-5b06-93fd-e167b79565eb
page-type-slug: finding
title: "The credential page-push has never been observed on a real renewal, only in a drive and a backfill"
domain-slug: domain/claude-account-credential
---

# Claim

The credential page-push has been observed working only in a drive and in a backfill, never on a real renewal. Whether a token rotating in the ordinary way carries itself into its page is unmeasured until eight renewal cycles have passed.

# Evidence

Filed on the verdict for #19385, 2026-08-17. That project wired a push into two writers, proved containment against four induced failures, and built `ops claude-account page-drift` to report whether a page is behind the credential in use.

What it did NOT wait for is a renewal. All eight pages were brought current by a backfill from the credential rows at 16:29-16:31, which the project flagged rather than presented as renewal. So `page-drift` reporting `8 current` today is evidence that the push mechanism works and that the backfill ran, and no evidence at all that the renewal writer fires.

The distinguishing measurement is cheap and takes only time: run `ops claude-account page-drift` after a token has rotated. An access token rotating on its ordinary cycle should carry itself into its page without anybody acting. If pages go `behind` while the fleet keeps authenticating, the writer is not firing and the drift the project set out to end has simply been reset once by hand.

One writer is named but not wired: `getBestCredential` also reaches `refreshOAuthTokenWithOutcome`, and the delivering seat believes it is covered indirectly because a renewal through it rewrites the file the watcher watches. Believed rather than measured, and the same reading answers it.
