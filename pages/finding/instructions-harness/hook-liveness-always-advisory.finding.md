---
id: 0724829a-16ff-5afe-9637-fb7b88f6a721
page-type-slug: finding
title: "Hook liveness always advisory"
domain-slug: domain/global
---

# Claim

The `hook-liveness` advisory reports that it cannot show a call passed through `tools/hooks/hold-seat.ts` on writes where that hook is demonstrably live. It fired on every write in a review pass and on every finding filed from it, each naming `Bash` as the hook's last firing. The same hook refused this seat outright when three governing documents moved, so its other branch — that the hook has stopped and everything it refuses is inoperative — is not what is happening.

# Evidence

Observed by this seat, `claude-domain-archivist-review-documents`, across a `review-documents` pass on 2026-08-13/14, and independently reported by the reviewer seat `claude-refusal-archivist-flex-6-review-instructions`, whose six `ops instructions write` calls each carried the same advisory while every other gate passed and all six commits landed.

Measured here: every `ops memory file-finding` call in this pass printed `[hook-liveness] advisory … last fired … for \`Bash\`, not for this call`. Separately, an attempt to spawn a seat was refused outright with a hold-seat refusal naming three governing documents that had moved since I read them, which is that hook enforcing.

The advisory's own text names the benign cause — a command named through a variable rather than a path — so this may be exactly what it is describing.

Not measured: whether any call anywhere gets a clean `hook-liveness` verdict. If none does, the advisory carries no signal; if some do, the difference between them is what matters and was not established.
