---
id: 2c695b9b-53fc-5b83-a7c9-737c05e1acab
page-type-slug: old-ops-command
title: "Ops service install"
slug: ops-service-install
domain-parent-slug: domain/ops-service
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/service/install.ts
path: service install
irreversible: true
---

# Definition

- **Ops service install** — a service's units and the cluster's reach into them, made equal to what its document says.

# Help

Makes the installed units equal what a service's document says.

IT TAKES ONE SERVICE, NAMED BY ITS DOCUMENT'S SLUG, or every one with --all.
Naming one reaches only that service's own units: nothing else is written,
enabled or removed, so bringing up one service cannot bring up others that
happen to have documents and no unit. Given neither, it refuses rather than
reaching the whole fleet because that was the shorter thing to type.

Each document states what it runs, where, whether it runs at all, and every
attribute of its unit. This composes those into a `.service`, and a `.timer`
where the document states a schedule, writes them under
`~/.local/state/workstation-services`, links them into the systemd user
directory and enables them. Every path is resolved to its real location
first, so one directory cannot be installed under two spellings.

A document stating `scope: system` is installed into `/etc/systemd/system`
through `sudo` and enabled without `systemctl --user`, because what it runs
needs the machine rather than the session. Everything else about it is the
same.

A document stating `enabled: false` is HELD: no unit is written for it, and
whatever stood for it is removed. That is how a service is turned off.

IT REMOVES WHAT NO DOCUMENT ACCOUNTS FOR, over the units it owns — every one
standing in its own directory, those linked into systemd from it, and the
hand-written ones under the instructions checkout that this command
replaces. Discovery runs over that directory as well as over the links, so a
generated unit outlives neither its document nor its link. In
`/etc/systemd/system` it owns ONLY what carries its own generated header, so
a unit the machine came with is never a candidate. A unit installed by
anything else is left alone and reported. Reading no document at all
refuses rather than removing everything, an unreadable tree not being a
fleet that should run nothing. Naming one service removes only that service's
own units, and only where its own document says enabled: false.

A service its document says is wanted by a target OTHER than `default.target`
is enabled but NOT started: that target is what starts it, and forcing it up
outside the session it belongs to only crash-loops it.

A document stating a port and a namespace is also given to the cluster: a
namespace, a selector-less service and an endpoint slice pointing at this
workstation's own address, read from its route. A document stating one of
the pair without the other is refused.

Dry-run unless --apply: the plan prints either way, and only --apply writes,
links, enables, stops or removes anything.
