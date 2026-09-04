#!/bin/sh
set -eu

YEAR=$(date -u +%Y)
WORKDIR=/tmp
DUMP="${WORKDIR}/annual-${YEAR}.dump"
GLOBALS="${WORKDIR}/globals-${YEAR}.sql"
DEST="dst:postgres-cnpg-backups/annual/${YEAR}"

echo "[annual-dump] year=${YEAR} host=${PGHOST} db=${PGDATABASE}"

echo "[annual-dump] pg_dump -Fc -> ${DUMP}"
pg_dump -Fc -d "$PGDATABASE" -f "$DUMP"

echo "[annual-dump] pg_dumpall --globals-only -> ${GLOBALS}"
pg_dumpall --globals-only > "$GLOBALS"

echo "[annual-dump] pg_restore --list (TOC self-check)"
toc_entries=$(pg_restore --list "$DUMP" | grep -cE '^[0-9]+;' || true)
echo "[annual-dump] TOC entries: ${toc_entries}"
if [ "$toc_entries" -lt 1 ]; then
  echo "ERROR: annual dump produced an empty archive TOC; refusing to treat it as valid" >&2
  exit 1
fi

echo "[annual-dump] rclone copy -> ${DEST}/"
rclone copy --multi-thread-streams 0 "$DUMP" "${DEST}/"
rclone copy --multi-thread-streams 0 "$GLOBALS" "${DEST}/"

echo "[annual-dump] rclone lsf ${DEST}/"
listing=$(rclone lsf "${DEST}/")
echo "$listing"
if ! echo "$listing" | grep -q "annual-${YEAR}.dump"; then
  echo "ERROR: uploaded annual dump not found in the destination listing" >&2
  exit 1
fi

echo "[annual-dump] done: ${DEST}/annual-${YEAR}.dump"
