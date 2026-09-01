import type { Finding } from "../finding.page-type.ts"

export const aPageQueryMeasuredThroughFetchReadsAsSerial = {
  id: "01a05aef-b3e7-7975-9971-2d8e5926c826",
  pageTypeSlug: "finding",
  slug: "a-page-query-measured-through-fetch-reads-as-serial",
  domainSlug: "workspace-package/pages-system",
  claim:
    "Bun's `fetch` holds one keep-alive connection per origin and sends the next request on it only when the last answer is in, so a burst of questions put to the page store through `fetch` comes back in the order it was sent whatever the server does. Addressing the same server by `localhost` rather than by an address opens more than one connection and the overlap appears again. A measurement of this service's concurrency taken through `fetch` measures the client as much as the server.",
  evidence:
    "Found while moving `page-listening` off `*:8787`. The test `a question is answered while another is still being answered` sends twenty wide questions unawaited and one narrow one after them, and asserts the narrow one comes back in the first ten of twenty-one. It passed at position 0, 1 and 5 before the change and failed at position 20 after it, with nothing changed in `page-serving` or in the read path.\n\nWhat changed was the address the test used. `Bun.serve` with no `hostname` gives `server.url` as `http://localhost:PORT/`; with `hostname` set to `127.0.0.1` it gives the literal. Twenty-one fetches to the literal came back at position 20 on every one of six rounds. The same twenty-one to `localhost`, against a server bound at `127.0.0.1` alone, came back at 0, 2, 0, 3, 2 and 2. Binding `127.0.0.1` alone, `127.0.0.1` beside `::1`, or `0.0.0.0`, all read the same when addressed by `localhost`. Holding one port across rounds made even `localhost` read as serial once a connection was warm.\n\nThe test now addresses the server by `localhost` at the port it bound, so it measures what it meant to, and it passes.\n\nThe finding `a-page-query-holds-the-loop-while-it-reads` rests on numbers taken over loopback through `fetch`. Its central claim, that answering never yields, is untouched. Its overlap positions were taken with this instrument and should be read as the client's behaviour as much as the server's.",
} as const satisfies Finding
