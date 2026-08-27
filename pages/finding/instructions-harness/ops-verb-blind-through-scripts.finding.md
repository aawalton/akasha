---
id: 87eb5948-dc3c-58be-9f4f-1948a326b4b3
slug: ops-verb-blind-through-scripts
page-type-slug: finding
title: "Ops verb blind through scripts"
domain-slug: domain/global
---

# Claim

An `ops` verb invoked from inside a shell script is invisible to `parseOpsCalls`, which reads only the tool call's own command text, so fixing the newline split would still leave an irreversible verb ungated whenever a script wraps it.

# Evidence

`tools/lib/ops-verb.ts` parses the command string of the call itself. A script it invokes is one word in that string, and the verbs inside the file are never seen. Probed against the library, with the verb built at runtime so the help gate would not read the strings as invocations:

    segment head (&&)        [{"words":["agent","retire","zzz"], ...}]
    newline                  []
    inside a called script   []

The first is the positive control: `agent retire` is one of the three declared irreversible verbs and parses when it heads a segment. The third is a script call, and `require-ops-help.ts:47-48` returns without refusing where the parsed list is empty.

This is a different mechanism from the newline split recorded in the finding beside it and takes a different remedy: widening `command.split(/[|;&]+/)` closes the newline case and leaves this one exactly as it stands. The docstring above the function states that not interpreting quoting means it "over-reports rather than under-reports", which neither case does.
