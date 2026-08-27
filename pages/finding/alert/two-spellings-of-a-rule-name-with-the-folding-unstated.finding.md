---
id: b837ff5e-f7cb-516a-b0ab-eaea5874ecf3
slug: two-spellings-of-a-rule-name-with-the-folding-unstated
page-type-slug: finding
title: "Two spellings of a rule name with the folding unstated"
domain-slug: page-type/alert
---

# Claim

The 73 Prometheus rules are still declared in PascalCase while every alert document naming them is a kebab slug, so something converts between the two spellings on every firing. The conversion has to fold acronyms exactly as the documents did — `GPUTemperatureHigh` to `gpu-temperature-high` — and nothing states that rule where the converter is written.

# Evidence

`pages/domain/watch-condition.domain.md` states that every watch condition is named by a domain slug. `promtool check rules` was verified on 2026-08-15 to accept a kebab `alert:` name, so the Prometheus rules CAN be renamed and nothing would convert. They have not been: the `prometheus/prometheus-config` configmap on the live cluster still declares all 73 in PascalCase — read it with `kubectl get configmap prometheus-config -n prometheus -o yaml` — and the thirteen `synth-alerts-*.ts` modules that composed it stood in the code repository behind a deploy, so no source for them stands in this tree.

Until that lands, the `infra-alert-bridge` worker kebab-cases the alertname at the firing site rather than carrying a table — its source stood in the code repository and stands in no tree here — reported by the seat building it on 2026-08-15. So the derivation exists in two places that must agree: once in whatever wrote the 67 documents, and once in the bridge.

The trap is acronyms. A naive PascalCase split gives `g-p-u-temperature-high`; the documents folded each acronym to one lowercase word, so `GPUTemperatureHigh` is `gpu-temperature-high` and reads as **GPU temperature high**. A converter folding differently produces a slug no document declares, and the observer reports it as an event nothing matched — which reads identically to a condition whose document was never written. The failure is a rename, not a gap, and nothing in the report distinguishes them.

Two ways out and neither is chosen here. Rename the rules at their source so no conversion exists anywhere, which is the end state `pages/domain/watch-condition.domain.md` describes. Or state the folding rule somewhere both converters read, and hold them to it.

One rule is deliberately absent from the documents either way: `Watchdog` is consumed by the bridge's dead-path check, in its code-repo source `packages/agents/infra-alert-bridge/src/dead-path.ts`, as proof that scrape and rule evaluation are alive, so it is an instrument reading rather than a condition anyone answers for.
