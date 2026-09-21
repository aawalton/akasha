import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const aPageReachesTheRunningMachineBeforeTheCodeThatReadsItDoes = {
  id: "01a0c540-a3e7-7745-9d90-0fff2b7d6e5e",
  type: "page-type/finding",
  slug: "a-page-reaches-the-running-machine-before-the-code-that-reads-it-does",
  domain: "page-type/web-app",
  claim:
    "A running web app reads pages live and runs code from an image. A page landed now reaches the machine in seconds; the code that understands what the page says reaches it only at the next deploy. So a property added to a page type is decoration on every image built before it, and whether decoration is safe depends entirely on what the reader does with a field it does not know. Where the reader is a gate, an unread field is no restriction, so the page reads as narrower than the machine behaves. Nothing on the page says which image is reading it.",
  evidence:
    "`pageTypeGrantsFor` asks for the `person-access` pages through `askingFor`, which the page service answers from the repository as it is now. `reachOf` in the same module is built into each app's bundle. Five grants for `person/anonymous` landed as edf9755c, each carrying the `narrow` Elin had added the same afternoon. alanwalton.com was serving 53e85b55, which predates `c976b883`, the commit teaching `reachOf` to read a narrow. Curled with no session, `/api/pages/view` answered 200 with every view in akasha and `/api/pages/feature-request` answered 200 with a request whose standing is `proposed`; `domain`, `nav`, `person` and `task` each answered 401, which is what showed the gate was running and keyed to those grants rather than absent. Taking the five grants back as 3bb21190 returned all three to 401 within seconds, which is the same liveness read from the other side. The window was three minutes fifty-eight seconds. The specific hole is closed: `658b898c` moves the narrow onto a deed of its own, `access-deed/read-some`, so an image looking for `access-deed/read` matches no narrowed grant and refuses it. The general shape is not closed, because nothing stops the next behaviour from being added as a field again.",
} as const satisfies Finding
