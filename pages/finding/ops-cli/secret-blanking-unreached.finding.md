---
id: 2257da91-4fea-561c-bf32-2b4743439948
slug: secret-blanking-unreached
page-type-slug: finding
title: "Secret blanking unreached"
domain-slug: domain/ops-cli
---

# Claim

Blanking a secret in the environment does not reliably reach an `ops` verb's body, so a
refusal path guarded by that secret cannot be proved by emptying it — the run proceeds
past the guard and spends the real effect the guard exists to withhold.

# Evidence

Proving `inference edit` during its move into this repository, `env GEMINI_API_KEY= ops
inference edit --image <file> --prompt smoke` was run to reach the verb's
`GEMINI_API_KEY is not set` refusal, which is an input error and exits 1. Both the
pre-move and post-move sides exited 3 and printed a Gemini HTTP 400 response body
("Unable to process input image"), which is an authenticated reply — so the guard did not
fire and a real request reached Google on each of the two runs.

What refills it is `BASH_ENV`, which is set to `$HOME/instructions/tools/bash-env.sh`
and is sourced by every non-interactive bash before it runs anything — the Bash tool, every
`bash -c` descendant and every bash-shebang script. That file restores the secrets, so the
blank is overwritten before the verb starts.

Proved directly: `env GEMINI_API_KEY= bash -c 'echo ${#GEMINI_API_KEY}'` prints 53, not 0.
The blanking does take effect where no bash intervenes — `env GEMINI_API_KEY= bun -e` prints
a zero-length value — which is why it looks as though it worked. The guard would have fired
on a blank: `packages/infra/inference/src/cli/edit.ts:214` parses the value with
`z.string().min(1)`, which rejects an empty string. It never saw one.

The route past it is to invoke `bun <root>/tools/ops/cli.ts` directly rather than `ops`,
which another seat used the same night to prove both `db` verbs' no-URL refusals.

A second mechanism reaches the same outcome without any refill: a capability whose
environment variables are only one of its sources. With all four `SEAWEEDFS_*` unset,
`seaweedFSObjectStoreFromEnv()` resolved from a config file, announced `s3-put-fallback
mode` and exited 0, against a help block declaring exit 3 for exactly that case.

Two `inference-run` rows were left behind by those runs, and no image was written.
