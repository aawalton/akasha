---
page-type-slug: question
id: 019fc29c-5084-7870-a6fc-cea1277433b7
title: "Do you ever launch `claude` by hand with the working directory `~/code`?"
slug: do-you-ever-launch-claude-by-hand-with-the-working-directory
status: answered
source-context: "019fbe77-9633-7424-b64f-a1773564a32b"
asked-by: 019f2330-25c9-770c-894f-fd4ac497997c
options:
  - "No, delete it"
  - "Yes, keep it and add the check"
answered-at: 2026-08-02T13:15:16.669Z
---
No, we should have a single settings.json that lives in the instructions repo and that should be used for both headless and (through spawn) interactive agents (through the bash aliases)
