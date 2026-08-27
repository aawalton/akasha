---
id: a9f4d9ab-51ab-543a-a087-6886c2c3a666
slug: feed-drops-rows-silently
page-type-slug: finding
title: "Feed drops rows silently"
domain-slug: page-type/monarch-transaction
---

# Claim

Monarch's feed dropped two of the five annual Midland National premiums it should have carried from the UCCU chequing account, while delivering every Banner Life premium out of that same account in the same months — so a row absent from the mirror is not evidence the payment did not happen.

# Evidence

Alan's own UCCU statement lists `Ext WD MIDLAND NATIONAL - INSURANCE` at $1,485.00 every September from 2018 to 2025 without a gap. Monarch's history on that account starts 2021-07-01, so it should carry five of them. It carried two: 2021-09-22 and 2022-09-21. Alan typed 2024 in by hand. Nothing at all stood for 2023 or 2025.

The two dropped years are not a connection outage. The account reported thirteen rows in September 2023, and in September 2025 it delivered the Banner Life premium of the same kind — an annual insurance ACH out of the same account, two weeks earlier in the same month — with the bank's own descriptor attached. The account is live now, not deactivated, not sync-disabled, balance $2,514.04.

Searched before concluding: every row in the 10,430-row history between $1,200 and $1,800, in case the premium had stepped; every row on the account in September and October of every year it covers; every debit at or over $400 across all accounts between 2023-09-06 and 2023-11-15 and between 2025-09-04 and 2025-11-15. Fourteen rows came back across the two windows and all fourteen are identifiable as something else.

The 2023 and 2025 rows were created on 2026-08-07 with `shouldUpdateBalance: false` and a note recording where they came from. The account balance was $2,514.04 before and after.

What this bears on is any conclusion drawn from a category looking complete. Two passes over Financial read it as settled while a fifth of its money was missing from the data both passes ran on.
