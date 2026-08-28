---
id: 01a04625-d80a-7cfd-9b51-484dfd18b410
page-type-slug: all-about-alan-topic
title: "How My Services Decide To Deploy"
slug: how-my-services-decide-to-deploy
topic-parents-slugs: the-graph-i-built-to-run-my-checks
---

# Definition

- **How My Services Decide To Deploy** — how a deploy gets decided, and the CI I had to build to run it

# Design

Whether a service needs to deploy is also a predicate over the graph, so the graph is solving my deploy throughput problem too.

I broke GitHub's team plan as an individual in January.

I ended up building an entire custom CI system on Kubernetes from scratch.

I am now growing past that to continuous deploy based on graph changes.

# Questions

What exactly broke in the team plan, and what the limit was, is unwritten.

What continuous deploy on graph changes still needs before it is running is not listed.
