---
page-type-slug: finding
title: "An instrument answers the question that was quick to write, which parts from the asked one only where nobody looked"
domain-slug: domain/agent-harness
slug: the-cheap-question-is-the-adjacent-one
---

# Claim

An instrument tends to answer a question adjacent to the one asked, because the adjacent question is the one that can be written quickly. Asking whether a file sits at a path is minutes of work; asking whether a specifier resolves means running the resolver. Asking whether a target is tracked here is one command; asking whether it resolves in whichever repository holds it is not. The cheap question passes on every case anyone thinks to try, and parts from the real one only where nobody looked.

# Evidence

Five instances on 2026-08-26, by two agents, in unrelated instruments.

A conversion checker asked whether a package's `exports` map was satisfied, reading a missing map as an empty whitelist. It reported healthy packages broken and its repair created the fault it claimed. A specifier-resolution question could not have gone wrong that way.

The same author's export resolver followed `export *` into a module it could not resolve, kept the names found so far, and treated that set as complete.

Then it asked whether a file stood at `<root>/src/<sub>.ts` when the question was whether `@pkg/sub` resolves. Those part exactly where a package enumerates its subpaths: the instructions fork of `@shared/utils-narrow` spells seven and no `./*`, so a repoint naming a file that exists and an export that does not read as sound. 1,923 specifiers were left unresolvable by a landing whose dry run had reported zero, and the batch was reverted whole. The dry run was run against the proposed tree before landing and still passed, because a dry run inherits the blind spot of the check it runs.

A rule proposed for `repoint/retargetSpecifier` asked whether a target was tracked in the host's own repository, where the question was whether it resolves in whichever repository holds it. Differenced over the population it would have left 623 real cross-repository imports unrewritten.

A health check for the `ops` CLI asked whether the command exited zero, piping it. `ops read` refuses to print into a pipe, so the probe reported a healthy tree broken and a broken one broken alike.

A sixth, by a third agent: a probe meant to show that an unreadable page still lands carried an unterminated quote and an unclosed bracket, both of which the parser accepts. It asked whether a badly written page passes where the question was whether an unreadable one does, and returned the expected result by another mechanism.

The third and fifth were found by running the thing rather than by any instrument.
