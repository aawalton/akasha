---
id: f1d3d101-cf08-5fc8-98aa-62649558468f
page-type-slug: domain
title: "Audit"
slug: audit
domain-parent-slug: domain/instrument-kind
---

# Definition

- **Audit** — an instrument run on state, reporting the problems it finds.

# Design

An instrument that must reach more than one repository to answer is an audit rather than a check.

Some audits take a band of their own.

# Intent

Every audit is lagging.

A whole run of the audits is slow.

# Principles

## Capability

**Draw an audit's boundary around the capability it needs, never around the rule it enforces.**

Getting the data is what costs, and an audit pays for it once however many rules it holds.

Two rules with no data in common are two audits.

Name an audit for its data, not its first rule.
