#!/usr/bin/env bash

NATIVE_SHELL_MONARCH_URL="https://app.monarch.com/links/transactions?isPending=false&needsReview=true&needsReviewUnassigned=true"

native_shell_monarch_url_swift() {
  if [[ -z "$NATIVE_SHELL_MONARCH_URL" ]]; then
    echo "ERROR: NATIVE_SHELL_MONARCH_URL is empty — the relay would be built around URL(string: \"\")!, which traps at launch on the first tap rather than failing here." >&2
    return 1
  fi

  cat <<SWIFT_MONARCH_URL
    /// Authored once for every shell in the monarch-url shell script.
    private static let monarchURL = URL(string: "${NATIVE_SHELL_MONARCH_URL}")!
SWIFT_MONARCH_URL
}
