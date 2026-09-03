FROM postgres:18-trixie AS pg-net-builder
ARG PG_NET_VERSION=0.20.2
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        git \
        libcurl4-openssl-dev \
        libicu-dev \
        postgresql-server-dev-18; \
    git clone --depth 1 --branch v${PG_NET_VERSION} https://github.com/supabase/pg_net.git /src/pg_net; \
    make -C /src/pg_net; \
    make -C /src/pg_net install

FROM postgres:18-trixie AS wal2json-builder
ARG WAL2JSON_VERSION=2_6
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        git \
        postgresql-server-dev-18; \
    git clone --depth 1 --branch wal2json_${WAL2JSON_VERSION} https://github.com/eulerto/wal2json.git /src/wal2json; \
    make -C /src/wal2json; \
    make -C /src/wal2json install

FROM postgres:18-trixie AS pg-jsonschema-builder
ARG PG_JSONSCHEMA_VERSION=0.3.4
ARG CARGO_PGRX_VERSION=0.16.1
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        clang \
        curl \
        git \
        libclang-dev \
        pkg-config \
        postgresql-server-dev-18; \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
        | sh -s -- -y --profile minimal --default-toolchain stable; \
    . "$HOME/.cargo/env"; \
    cargo install --locked cargo-pgrx --version ${CARGO_PGRX_VERSION}; \
    cargo pgrx init --pg18 /usr/lib/postgresql/18/bin/pg_config; \
    git clone --depth 1 --branch v${PG_JSONSCHEMA_VERSION} \
        https://github.com/supabase/pg_jsonschema.git /src/pg_jsonschema; \
    cd /src/pg_jsonschema; \
    cargo pgrx install --release --pg-config /usr/lib/postgresql/18/bin/pg_config

FROM ghcr.io/cloudnative-pg/postgresql:18.4-standard-trixie

ARG TIMESCALEDB_VERSION=2.24.0

USER root

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        gnupg \
        lsb-release; \
    echo "deb https://packagecloud.io/timescale/timescaledb/debian/ $(lsb_release -cs) main" \
        > /etc/apt/sources.list.d/timescaledb.list; \
    curl -fsSL https://packagecloud.io/timescale/timescaledb/gpgkey \
        | gpg --dearmor -o /etc/apt/trusted.gpg.d/timescaledb.gpg; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        "timescaledb-2-postgresql-18=${TIMESCALEDB_VERSION}~*" \
        "timescaledb-2-loader-postgresql-18=${TIMESCALEDB_VERSION}~*"; \
    rm -rf /var/lib/apt/lists/*

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        libcurl4 \
        postgresql-18-cron; \
    apt-get purge -y --auto-remove curl gnupg lsb-release; \
    rm -rf /var/lib/apt/lists/*

COPY --from=pg-net-builder /usr/lib/postgresql/18/lib/pg_net.so \
     /usr/lib/postgresql/18/lib/
COPY --from=pg-net-builder /usr/share/postgresql/18/extension/pg_net* \
     /usr/share/postgresql/18/extension/

COPY --from=wal2json-builder /usr/lib/postgresql/18/lib/wal2json.so \
     /usr/lib/postgresql/18/lib/

COPY --from=pg-jsonschema-builder /usr/lib/postgresql/18/lib/pg_jsonschema.so \
     /usr/lib/postgresql/18/lib/
COPY --from=pg-jsonschema-builder /usr/share/postgresql/18/extension/pg_jsonschema* \
     /usr/share/postgresql/18/extension/

USER 26
