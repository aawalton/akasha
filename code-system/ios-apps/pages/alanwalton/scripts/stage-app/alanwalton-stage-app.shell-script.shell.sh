#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# The package, not the script's parent: these scripts stand in a folder of
# their own now, and www/ belongs beside the manifest Capacitor reads.
native_shell_dir="$(cd "${script_dir}/../.." && pwd)"
spa_dir="${NATIVE_SHELL_SPA_SOURCE_DIR:?is unset. The ios-app page states spa-source-repo-path, and the ops mobile command running this build exports it as an absolute path. This script states no value of its own to fall back to.}"
# The SPA is its own package now, and the page states its path whole rather than the path of
# the package it once sat inside. The package beside it holds the env file the client bundle
# is built against and the favicon the shell serves.
web_dir="$(cd "${spa_dir}/../web" && pwd)"
client_dir="${spa_dir}/build/client"
dest_dir="${native_shell_dir}/www"

set -a
# shellcheck disable=SC1091
[[ -f "${web_dir}/.env.local" ]] && . "${web_dir}/.env.local"
export NEXT_PUBLIC_API_ORIGIN="https://alanwalton.com"
export NEXT_PUBLIC_BUILD_SHA="${NEXT_PUBLIC_BUILD_SHA:-$(git -C "${web_dir}" rev-parse HEAD)}"
for _var in NEXT_PUBLIC_API_ORIGIN NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY NEXT_PUBLIC_BUILD_SHA; do
  if [[ -z "${!_var:-}" ]]; then
    echo "[stage-app] ERROR: ${_var} is empty — the bundle would ship with an un-inlined client env (compiles to undefined). Set it (script export, or alan/web/.env.local for the SUPABASE_* pair) before staging." >&2
    exit 1
  fi
done
set +a

echo "[stage-app] building in-shell SPA (${spa_dir}) …"
(cd "${spa_dir}" && npx react-router build)

if [[ ! -f "${client_dir}/index.html" ]]; then
  echo "[stage-app] ERROR: expected ${client_dir}/index.html after build" >&2
  exit 1
fi

echo "[stage-app] staging app surface → ${dest_dir}"
rm -rf "${dest_dir}"
mkdir -p "${dest_dir}"
cp "${client_dir}/index.html" "${dest_dir}/index.html"
cp "${web_dir}/public/favicon.svg" "${dest_dir}/favicon.svg"
cp -R "${client_dir}/assets" "${dest_dir}/assets"

echo "[stage-app] done. staged files:"
(cd "${dest_dir}" && find . -type f | sort)
echo "[stage-app] www/ built (gitignored). It is injected into the iOS bundle by the"
echo "[stage-app] intentional release that ships the build to TestFlight — no commit step."
